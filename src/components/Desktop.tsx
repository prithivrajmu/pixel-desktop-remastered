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
import { desktopIcons, welcomeWindow } from '../config/desktopIcons';

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

export const Desktop: React.FC = () => {
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
  const { activeDialog, openDialog, closeDialog } = useGlobalDialog();

  const {
    contextMenu,
    selectedIcons,
    handleDesktopRightClick,
    handleIconRightClick,
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
      // On mobile, windows should be nearly fullscreen with proper spacing
      return {
        width: Math.max(320, width - padding),
        height: Math.max(400, height - taskbarHeight - titleBarHeight - padding)
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

  // Handle window resize for maximized windows and responsive updates
  useEffect(() => {
    const handleWindowResize = () => {
      const taskbarHeight = screenSize.isMobile ? 48 : 28;
      
      windows.forEach(windowData => {
        const isMaximized = windowData.size.width >= window.innerWidth - 20 && 
                          windowData.size.height >= window.innerHeight - taskbarHeight - 20;
        
        if (isMaximized || screenSize.isMobile) {
          // Update maximized windows or force mobile windows to optimal size
          const optimalSize = getOptimalWindowSize();
          const centeredPosition = centerWindow(optimalSize);
          
          updateWindow(windowData.id, {
            size: optimalSize,
            position: centeredPosition
          });
        } else if (screenSize.isTablet) {
          // Ensure tablet windows fit within screen bounds
          const maxWidth = window.innerWidth - 32;
          const maxHeight = window.innerHeight - taskbarHeight - 32;
          
          if (windowData.size.width > maxWidth || windowData.size.height > maxHeight) {
            updateWindow(windowData.id, {
              size: {
                width: Math.min(windowData.size.width, maxWidth),
                height: Math.min(windowData.size.height, maxHeight)
              },
              position: {
                x: Math.min(windowData.position.x, maxWidth - windowData.size.width),
                y: Math.min(windowData.position.y, maxHeight - windowData.size.height)
              }
            });
          }
        }
      });
    };

    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('orientationchange', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('orientationchange', handleWindowResize);
    };
  }, [windows, updateWindow, screenSize, getOptimalWindowSize, centerWindow]);

  // Immediately resize all windows when screen size detection changes
  useEffect(() => {
    if (screenSize.width > 0 && windows.length > 0) {
      windows.forEach(windowData => {
        const optimalSize = getOptimalWindowSize();
        const optimalPosition = centerWindow(optimalSize);
        
        // Only update if the size or position would change significantly
        const sizeDiff = Math.abs(windowData.size.width - optimalSize.width) > 50 || 
                         Math.abs(windowData.size.height - optimalSize.height) > 50;
        const posDiff = screenSize.isMobile && (windowData.position.x > 20 || windowData.position.y > 20);
        
        if (sizeDiff || posDiff) {
          updateWindow(windowData.id, {
            size: optimalSize,
            position: optimalPosition
          });
        }
      });
    }
  }, [screenSize.isMobile, screenSize.isTablet, screenSize.width, screenSize.height, windows, getOptimalWindowSize, centerWindow, updateWindow]);

  // Show welcome screen on startup
  useEffect(() => {
    if (!welcomeOpenedRef.current) {
      // Play boot sequence sound
      sounds.playBootSequence();
      
      const timer = setTimeout(() => {
        openWindow(welcomeWindow);
        welcomeOpenedRef.current = true;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [openWindow, sounds]);

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
    const icon = desktopIcons.find(i => i.id === contextMenu.targetId);
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
      const icon = desktopIcons.find(i => i.id === contextMenu.targetId);
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
      >
        <BackgroundManager 
          selectedBackground={selectedBackground}
          className="z-0" 
        />

        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            name={icon.name}
            icon={
              <IconManager 
                iconId={icon.id} 
                fallback={icon.icon} 
                size={32}
              />
            }
            position={icon.position}
            isSelected={selectedIcons.has(icon.id)}
            tooltip={icon.tooltip}
            onDoubleClick={() => handleOpenWindow(icon.windowConfig)}
            onClick={() => handleIconClick(icon.id)}
            onRightClick={(e) => handleIconRightClick(e, icon.id)}
          />
        ))}

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
              const isMaximized = windowData.size.width === window.innerWidth && windowData.size.height === window.innerHeight - 40;
              if (!isMaximized) {
                // Store previous size and position, then maximize
                const maxWidth = window.innerWidth;
                const maxHeight = window.innerHeight - 40; // Account for taskbar
                updateWindow(windowData.id, {
                  prevSize: windowData.size,
                  prevPosition: windowData.position,
                  size: { width: maxWidth, height: maxHeight },
                  position: { x: 0, y: 0 }
                });
              } else {
                // Restore previous size and position if available, else use default
                updateWindow(windowData.id, {
                  size: windowData.prevSize || { width: 800, height: 600 },
                  position: windowData.prevPosition || centerWindow({ width: 800, height: 600 })
                });
              }
            }}
            onUpdatePosition={(position) => updateWindow(windowData.id, { position })}
            onUpdateSize={(size) => updateWindow(windowData.id, { size })}
          >
            {windowData.title === 'Welcome' ? (
              <windowData.component onClose={() => closeWindow(windowData.id)} />
            ) : (
              <windowData.component />
            )}
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
          onCancel={() => setIsShutdownDialogOpen(false)}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div 
              className="bg-[#c0c0c0] border-2 border-gray-400 shadow-lg w-[500px] h-[400px]" 
              style={{ 
                borderStyle: 'outset',
                fontFamily: '"MS Sans Serif", sans-serif'
              }}
            >
              {/* Title Bar */}
              <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between text-xs">
                <span className="font-bold">Display Properties</span>
                <div className="flex items-center space-x-1">
                  <button 
                    className="w-4 h-4 bg-[#c0c0c0] border border-gray-400 flex items-center justify-center text-black text-xs hover:bg-gray-200"
                    style={{ borderStyle: 'outset' }}
                    title="Help"
                    onClick={() => sounds.playClick()}
                  >
                    ?
                  </button>
                  <button
                    className="w-4 h-4 bg-[#c0c0c0] border border-gray-400 flex items-center justify-center text-black text-xs hover:bg-gray-200"
                    style={{ borderStyle: 'outset' }}
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
              
              {/* Content */}
              <div className="h-[calc(100%-24px)]">
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
