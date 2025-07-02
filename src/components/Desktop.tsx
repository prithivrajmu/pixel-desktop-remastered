import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { DesktopIcon } from './DesktopIcon';
import { StartMenu } from './StartMenu';
import { ContextMenu } from './ContextMenu';
import { 
  WindowSwitcher, 
  ShutdownDialog, 
  ShutdownScreen, 
  DisplayProperties, 
  PropertiesDialog 
} from './LazyComponents';
import { SoundManager, useSounds } from './SoundManager';
import { IconManager } from './IconManager';
import { BackgroundManager } from './BackgroundManager';
import { useDesktopState } from '../hooks/useDesktopState';
import { useKeyboardEvents } from '../hooks/useKeyboardEvents';
import { useContextMenu } from '../hooks/useContextMenu';
import { useGlobalDialog } from '../hooks/useGlobalDialog';
import { useSmartPreloader } from '../hooks/useComponentPreloader';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
import { useScreenSize } from '../hooks/use-mobile';
import { desktopIcons, getDesktopIcons, welcomeWindow } from '../config/desktopIcons';

export interface WindowData {
  id: string;
  title: string;
  icon?: string;
  component: React.ComponentType<any>;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  prevSize?: { width: number; height: number };
  prevPosition?: { x: number; y: number };
}

export interface DesktopProps {
  /**
   * Array of windows to automatically open when the desktop mounts. Should not
   * contain runtime generated fields such as id, size, or zIndex – those are
   * handled by the desktop itself.
   */
  autoOpenWindows?: Array<Omit<WindowData, 'id' | 'zIndex' | 'size'>>;
  /**
   * Callback fired when all windows are closed
   */
  onAllWindowsClosed?: () => void;
}

export const Desktop: React.FC<DesktopProps> = ({ autoOpenWindows = [], onAllWindowsClosed }) => {
  const {
    windows,
    activeWindowId,
    selectedBackground,
    openWindow,
    closeWindow,
    focusWindow,
    updateWindow,
    setSelectedBackground
  } = useDesktopState();

  const [isShutdownDialogOpen, setIsShutdownDialogOpen] = useState(false);
  const [isShutdownScreenVisible, setIsShutdownScreenVisible] = useState(false);
  const welcomeOpenedRef = useRef(false);
  const hasHadWindowsRef = useRef(false);
  const { activeDialog, openDialog, closeDialog } = useGlobalDialog();

  const {
    contextMenu,
    selectedIcons,
    handleDesktopRightClick,
    handleIconRightClick,
    handleIconLongPress,
    handleDesktopLongPress,
    handleIconClick,
    handleDesktopClick,
    closeContextMenu
  } = useContextMenu();

  const {
    isAltTabOpen,
    altTabIndex,
    setIsAltTabOpen
  } = useKeyboardEvents(windows, focusWindow);

  const sounds = useSounds();
  const screenSize = useScreenSize();

  // Initialize performance optimizations
  useSmartPreloader();
  usePerformanceMonitor('Desktop');

  // Clear welcome flag when browser tab/window is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentSessionId = sessionStorage.getItem('desktop.sessionId');
      const storedSessionId = localStorage.getItem('desktop.hasSeenWelcome');
      
      // Clear the welcome flag if it matches current session
      if (currentSessionId && storedSessionId === currentSessionId) {
        localStorage.removeItem('desktop.hasSeenWelcome');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const [isDisplayPropertiesOpen, setIsDisplayPropertiesOpen] = useState(false);
  const [isPropertiesDialogOpen, setIsPropertiesDialogOpen] = useState(false);
  const [selectedIconForProperties, setSelectedIconForProperties] = useState<any>(null);

  // Enhanced responsive window positioning and sizing
  const getOptimalWindowSize = useCallback(() => {
    const { width, height, isMobile, isTablet } = screenSize;
    const taskbarHeight = isMobile ? 48 : 28; // Larger taskbar on mobile
    const titleBarHeight = isMobile ? 36 : 28; // Account for title bar
    const padding = isMobile ? 16 : 16; // More padding on mobile for better UX
    
    if (isMobile) {
      // On mobile, windows should take the full width (minus small padding)
      // and the full available height above the taskbar/title-bar so users can
      // always scroll inside the window if its content is tall.
      const availableHeight = height - taskbarHeight - titleBarHeight - padding;
      return {
        width: Math.max(320, width - padding),
        // Always stay within the viewport – no hard minimum that would overflow.
        height: availableHeight,
      };
    } else if (isTablet) {
      // On tablet, use 85% of screen with minimum sizes
      return {
        width: Math.min(Math.max(600, width * 0.85), width - padding * 2),
        height: Math.min(Math.max(500, height * 0.8), height - taskbarHeight - padding * 2)
      };
    } else {
      // Desktop: use original fixed size but constrain to screen
      return {
        width: Math.min(800, width - padding * 2),
        height: Math.min(600, height - taskbarHeight - padding * 2)
      };
    }
  }, [screenSize]);

  const centerWindow = useCallback((size: { width: number; height: number }) => {
    const taskbarHeight = screenSize.isMobile ? 48 : 28;
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight - taskbarHeight;
    
    if (screenSize.isMobile) {
      // On mobile, position windows at top-left with minimal padding
      return { x: 8, y: 8 };
    } else {
      // Center windows on tablet and desktop
      const x = Math.max(0, (availableWidth - size.width) / 2);
      const y = Math.max(0, (availableHeight - size.height) / 2);
      return { x, y };
    }
  }, [screenSize]);

  // Preserve manual window sizes/positions while still ensuring they remain on-screen.
  // We only adjust a window when it would overflow the visible viewport *or* when we
  // transition between break-points (mobile → tablet → desktop and vice-versa).
  useEffect(() => {
    if (windows.length === 0) return;

    const { width: viewportW, height: viewportH, isMobile, isTablet } = screenSize;
    const taskbarHeight = isMobile ? 48 : 28;

    windows.forEach(windowData => {
      const overflowsX = windowData.position.x + windowData.size.width > viewportW;
      const overflowsY = windowData.position.y + windowData.size.height > viewportH - taskbarHeight;

      // Determine if we just crossed a responsive breakpoint (mobile ⇄ tablet ⇄ desktop)
      const breakpointKey = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
      // Store the last evaluated breakpoint in a global variable (typed as any to avoid TS complaints).
      if (!(window as any).__lastBreakpoint) {
        (window as any).__lastBreakpoint = breakpointKey;
      }

      const breakpointChanged = (window as any).__lastBreakpoint !== breakpointKey;

      if (overflowsX || overflowsY || breakpointChanged) {
        const optimalSize = getOptimalWindowSize();
        const optimalPosition = centerWindow(optimalSize);

        updateWindow(windowData.id, {
          size: optimalSize,
          position: optimalPosition,
        });
      }
    });

    // Update stored breakpoint after processing.
    (window as any).__lastBreakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
  }, [screenSize.isMobile, screenSize.isTablet, windows, getOptimalWindowSize, centerWindow, updateWindow, screenSize.width, screenSize.height]);

  // Show welcome screen on startup (only once per session)
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('desktop.hasSeenWelcome');
    const sessionId = sessionStorage.getItem('desktop.sessionId') || Date.now().toString();
    
    // Store session ID if not exists
    if (!sessionStorage.getItem('desktop.sessionId')) {
      sessionStorage.setItem('desktop.sessionId', sessionId);
    }
    
    // Only show welcome if:
    // 1. Haven't seen it this session (localStorage check)
    // 2. No auto-open windows (so we don't show it on blog routes)
    // 3. Component ref hasn't already shown it
    if (!hasSeenWelcome && autoOpenWindows.length === 0 && !welcomeOpenedRef.current) {
      // Play boot sequence sound
      sounds.playBootSequence();
      
      const timer = setTimeout(() => {
        openWindow(welcomeWindow);
        welcomeOpenedRef.current = true;
        // Mark as seen for this browser session
        localStorage.setItem('desktop.hasSeenWelcome', sessionId);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [openWindow, sounds, autoOpenWindows.length]);

  const handleOpenWindow = (windowConfig: any) => {
    const optimalSize = getOptimalWindowSize();
    const centeredPosition = centerWindow(optimalSize);
    
    openWindow({
      ...windowConfig,
      position: centeredPosition,
      size: optimalSize
    });
  };

  const handleShutdown = () => {
    setIsShutdownDialogOpen(true);
    closeDialog();
  };

  const confirmShutdown = (action: 'shutdown' | 'restart' | 'msdos' | 'logoff') => {
    setIsShutdownDialogOpen(false);
    if (action === 'restart') {
      window.location.reload();
      return;
    }
    // For simplicity treat other actions same as shutdown
    sounds.playShutdown();
    setTimeout(() => {
      setIsShutdownScreenVisible(true);
    }, 1000);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleDisplayProperties = () => {
    setIsDisplayPropertiesOpen(true);
    closeContextMenu();
  };

  const handleIconProperties = () => {
    const icon = getDesktopIcons(screenSize).find(i => i.id === contextMenu.targetId);
    if (icon) {
      setSelectedIconForProperties(icon);
      setIsPropertiesDialogOpen(true);
    }
    closeContextMenu();
  };

  const desktopContextItems = [
    { label: 'Arrange Icons', disabled: true },
    { label: 'Line up Icons', disabled: true },
    { separator: true },
    { label: 'Paste', disabled: true },
    { label: 'Paste Shortcut', disabled: true },
    { separator: true },
    { label: 'New', hasSubmenu: true, submenu: [
      { label: 'Folder', disabled: true },
      { label: 'Shortcut', disabled: true }
    ]},
    { separator: true },
    { label: 'Properties', onClick: handleDisplayProperties }
  ];

  const iconContextItems = [
    { label: 'Open', onClick: () => {
      const icon = getDesktopIcons(screenSize).find(i => i.id === contextMenu.targetId);
      if (icon) handleOpenWindow(icon.windowConfig);
    }},
    { separator: true },
    { label: 'Cut', disabled: true },
    { label: 'Copy', disabled: true },
    { separator: true },
    { label: 'Create Shortcut', disabled: true },
    { label: 'Delete', disabled: true },
    { label: 'Rename', disabled: true },
    { separator: true },
    { label: 'Properties', onClick: handleIconProperties }
  ];

  /* ---------------- ICON LAYOUT ---------------- */
  // Compute a tidy grid-style layout for desktop icons that adapts to the
  // current viewport height. Icons will fill a column top-to-bottom and
  // then start a new column, similar to the classic Windows desktop.
  const getIconPosition = useCallback(
    (index: number) => {
      const margin = 20; // distance from screen edge & between columns
      // Estimated full icon "block" height (icon + label + spacing)
      const iconBlockHeight = screenSize.isMobile
        ? 100
        : screenSize.isTablet
          ? 90
          : 80;
      const iconBlockWidth = screenSize.isMobile
        ? 80
        : screenSize.isTablet
          ? 72
          : 64;

      const taskbarHeight = screenSize.isMobile ? 48 : 28;
      const usableHeight = Math.max(100, screenSize.height - taskbarHeight - margin * 2);

      const iconsPerColumn = Math.max(1, Math.floor(usableHeight / iconBlockHeight));
      const column = Math.floor(index / iconsPerColumn);
      const row = index % iconsPerColumn;

      return {
        x: margin + column * (iconBlockWidth + margin),
        y: margin + row * iconBlockHeight,
      } as const;
    },
    [screenSize]
  );

  // Automatically open any windows provided via props
  useEffect(() => {
    if (autoOpenWindows.length === 0) return;

    autoOpenWindows.forEach(cfg => {
      // If a window with the same title is already open, do not reopen it
      const alreadyOpen = windows.some(w => w.title === cfg.title);
      if (!alreadyOpen) {
        handleOpenWindow(cfg);
      }
    });
    // Only run when the autoOpenWindows reference changes (e.g., route change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpenWindows]);

  // Track if we've had windows and call onAllWindowsClosed when they're all closed
  useEffect(() => {
    if (windows.length > 0) {
      hasHadWindowsRef.current = true;
    } else if (windows.length === 0 && hasHadWindowsRef.current && onAllWindowsClosed) {
      onAllWindowsClosed();
    }
  }, [windows.length, onAllWindowsClosed]);

  return (
    <>
      <SoundManager />
      <div 
        className="w-full h-screen bg-teal-600 relative overflow-hidden select-none"
        style={{
          fontFamily: '"MS Sans Serif", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}
        onClick={handleDesktopClick}
        onContextMenu={handleDesktopRightClick}
        onTouchStart={(e) => {
          if (screenSize.isTouchDevice && e.touches.length === 1) {
            // Check if the touch target is within an icon element
            const target = e.target as HTMLElement;
            const isIconElement = target.closest('[data-icon-element]');
            
            // Only handle desktop long press if not touching an icon
            if (!isIconElement) {
              // Simple long press detection for desktop background
              const timer = setTimeout(() => {
                handleDesktopLongPress(e);
              }, 500);
              
              const handleTouchEnd = () => {
                clearTimeout(timer);
                document.removeEventListener('touchend', handleTouchEnd);
                document.removeEventListener('touchmove', handleTouchMove);
              };
              
              const handleTouchMove = () => {
                clearTimeout(timer);
                document.removeEventListener('touchend', handleTouchEnd);
                document.removeEventListener('touchmove', handleTouchMove);
              };
              
              document.addEventListener('touchend', handleTouchEnd);
              document.addEventListener('touchmove', handleTouchMove);
            }
          }
        }}
      >
        <BackgroundManager 
          selectedBackground={selectedBackground}
          className="z-0" 
        />

        {getDesktopIcons(screenSize).map((icon, idx) => {
          // Calculate responsive icon size
          const getIconSize = () => {
            const { width, height, isMobile, isTablet, isLandscape } = screenSize;
            const screenArea = width * height;
            const isSmallScreen = screenArea < 600000;
            const isMediumScreen = screenArea < 1200000;
            
            if (isMobile) {
              return isSmallScreen ? 24 : 30;
            } else if (isTablet) {
              return isLandscape ? 32 : 36;
            } else {
              return isSmallScreen ? 28 : isMediumScreen ? 32 : 40;
            }
          };
          
          return (
            <DesktopIcon
              key={icon.id}
              name={icon.name}
              icon={
                <IconManager 
                  iconId={icon.id} 
                  fallback={icon.icon} 
                  size={getIconSize()}
                />
              }
              position={icon.position}
              isSelected={selectedIcons.has(icon.id)}
              onDoubleClick={() => handleOpenWindow(icon.windowConfig)}
              onClick={() => handleIconClick(icon.id)}
              onRightClick={(e) => handleIconRightClick(e, icon.id)}
              onLongPress={(e) => handleIconLongPress(e, icon.id)}
              tooltip={icon.tooltip}
            />
          );
        })}

        {windows.map(windowData => (
          <Window
            key={windowData.id}
            title={windowData.title}
            icon={windowData.icon}
            isActive={activeWindowId === windowData.id}
            isMinimized={windowData.isMinimized}
            position={windowData.position}
            size={windowData.size}
            zIndex={windowData.zIndex}
            onClose={() => closeWindow(windowData.id)}
            onFocus={() => focusWindow(windowData.id)}
            onMinimize={() => updateWindow(windowData.id, { isMinimized: true })}
            onMaximize={() => {
              const taskbarHeight = screenSize.isMobile ? 48 : 28;
              const maxWidth = window.innerWidth;
              const maxHeight = window.innerHeight - taskbarHeight;
              
              // More accurate check for maximized state with proper tolerance
              const isMaximized = 
                Math.abs(windowData.size.width - maxWidth) <= 5 && 
                Math.abs(windowData.size.height - maxHeight) <= 5 &&
                windowData.position.x <= 5 && windowData.position.y <= 5;
              
              // Prevent rapid fire maximize calls
              setTimeout(() => {
                if (!isMaximized) {
                  // Store previous size and position, then maximize
                  updateWindow(windowData.id, {
                    prevSize: windowData.size,
                    prevPosition: windowData.position,
                    size: { width: maxWidth, height: maxHeight },
                    position: { x: 0, y: 0 }
                  });
                } else {
                  // Restore previous size and position if available, else use responsive default
                  const defaultSize = getOptimalWindowSize();
                  const defaultPosition = centerWindow(defaultSize);
                  updateWindow(windowData.id, {
                    size: windowData.prevSize || defaultSize,
                    position: windowData.prevPosition || defaultPosition,
                    // Clear the stored previous values after restoring
                    prevSize: undefined,
                    prevPosition: undefined
                  });
                }
              }, 50); // Small delay to prevent flickering
            }}
            onUpdatePosition={(position) => updateWindow(windowData.id, { position })}
            onUpdateSize={(size) => updateWindow(windowData.id, { size })}
          >
            <windowData.component onClose={() => closeWindow(windowData.id)} />
          </Window>
        ))}

        <ContextMenu
          isVisible={contextMenu.isVisible}
          position={contextMenu.position}
          onClose={closeContextMenu}
          items={contextMenu.type === 'desktop' ? desktopContextItems : iconContextItems}
        />

        {activeDialog === 'start' && (
          <StartMenu 
            onShutdown={handleShutdown}
          />
        )}

        <WindowSwitcher
          isVisible={isAltTabOpen}
          windows={windows}
          selectedIndex={altTabIndex}
          onSelect={focusWindow}
          onClose={() => setIsAltTabOpen(false)}
        />

        <ShutdownDialog
          isOpen={isShutdownDialogOpen}
          onConfirm={confirmShutdown}
          onCancel={() => {
            setIsShutdownDialogOpen(false);
          }}
        />

        <ShutdownScreen
          isVisible={isShutdownScreenVisible}
          onRestart={handleRestart}
        />

        <Taskbar
          windows={windows}
          activeWindowId={activeWindowId}
          onWindowClick={(id: string) => {
            const window = windows.find(w => w.id === id);
            if (window?.isMinimized) {
              updateWindow(id, { isMinimized: false });
            }
            focusWindow(id);
          }}
          onStartClick={() => {
            if (activeDialog === 'start') {
              closeDialog();
            } else {
              openDialog('start');
            }
            sounds.playClick();
          }}
          isStartMenuOpen={activeDialog === 'start'}
        />

        {/* Display Properties Modal Dialog */}
        {isDisplayPropertiesOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
            <div 
              className={`bg-[#c0c0c0] border-2 border-gray-400 shadow-lg ${
                screenSize.isMobile 
                  ? (screenSize.isLandscape 
                    ? 'w-[95vw] max-w-[700px] h-[90vh] max-h-[600px]' 
                    : 'w-[95vw] max-w-[350px] h-[90vh] max-h-[600px]'
                  )
                  : 'w-[700px] h-[600px] max-w-[85vw] max-h-[85vh]'
              } flex flex-col overflow-hidden`} 
              style={{ 
                borderStyle: 'outset',
                fontFamily: '"MS Sans Serif", sans-serif',
                minHeight: screenSize.isMobile && !screenSize.isLandscape ? '400px' : 
                          screenSize.isMobile && screenSize.isLandscape ? '450px' : '350px',
                maxHeight: screenSize.isMobile 
                  ? (screenSize.isLandscape ? '90vh' : '90vh')
                  : '90vh'
              }}
            >
              {/* Title Bar */}
              <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between text-xs flex-shrink-0">
                <span className="font-bold">Display Properties</span>
                <div className="flex items-center space-x-1">
                  <button 
                    className={`bg-[#c0c0c0] border border-gray-400 flex items-center justify-center text-black hover:bg-gray-200 ${
                      screenSize.isMobile 
                        ? (screenSize.isLandscape ? 'w-3 h-3 text-[8px]' : 'w-4 h-3 text-[9px]')
                        : 'w-4 h-4 text-xs'
                    }`}
                    style={{ 
                      borderStyle: 'outset',
                      fontSize: screenSize.isMobile 
                        ? (screenSize.isLandscape ? '7px' : '8px')
                        : '10px'
                    }}
                    title="Help"
                    onClick={() => sounds.playClick()}
                  >
                    ?
                  </button>
                  <button
                    className={`bg-[#c0c0c0] border border-gray-400 flex items-center justify-center text-black hover:bg-gray-200 font-bold ${
                      screenSize.isMobile 
                        ? (screenSize.isLandscape ? 'w-3 h-3 text-[8px]' : 'w-4 h-3 text-[9px]')
                        : 'w-4 h-4 text-xs'
                    }`}
                    style={{ 
                      borderStyle: 'outset',
                      fontSize: screenSize.isMobile 
                        ? (screenSize.isLandscape ? '7px' : '8px')
                        : '10px'
                    }}
                    onClick={() => {
                      sounds.playClick();
                      setIsDisplayPropertiesOpen(false);
                    }}
                    title="Close"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              {/* Content - Scrollable for Mobile Landscape */}
              <div className={`flex-1 ${
                screenSize.isMobile && screenSize.isLandscape ? 'overflow-y-auto' : 'overflow-hidden'
              }`}>
                <DisplayProperties
                  selectedBackground={selectedBackground}
                  onBackgroundChange={setSelectedBackground}
                  onClose={() => setIsDisplayPropertiesOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Icon Properties Dialog */}
        {isPropertiesDialogOpen && selectedIconForProperties && (
          <PropertiesDialog
            isOpen={isPropertiesDialogOpen}
            onClose={() => {
              setIsPropertiesDialogOpen(false);
              setSelectedIconForProperties(null);
            }}
            iconData={selectedIconForProperties}
          />
        )}
      </div>
    </>
  );
};
