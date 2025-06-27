import React, { useState, useEffect, useRef } from 'react';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { DesktopIcon } from './DesktopIcon';
import { StartMenu } from './StartMenu';
import { WindowSwitcher } from './WindowSwitcher';
import { ShutdownDialog } from './ShutdownDialog';
import { ShutdownScreen } from './ShutdownScreen';
import { ContextMenu } from './ContextMenu';
import { DisplayProperties } from './DisplayProperties';
import { SoundManager, useSounds } from './SoundManager';
import { IconManager } from './IconManager';
import { BackgroundManager } from './BackgroundManager';
import { useDesktopState } from '../hooks/useDesktopState';
import { useKeyboardEvents } from '../hooks/useKeyboardEvents';
import { useContextMenu } from '../hooks/useContextMenu';
import { useGlobalDialog } from '../hooks/useGlobalDialog';
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

  const [isDisplayPropertiesOpen, setIsDisplayPropertiesOpen] = useState(false);

  // Handle window resize for maximized windows
  useEffect(() => {
    const handleWindowResize = () => {
      windows.forEach(windowData => {
        const isMaximized = windowData.size.width === window.innerWidth && windowData.size.height === window.innerHeight - 40;
        if (isMaximized) {
          // Update maximized windows to new screen dimensions
          const maxWidth = window.innerWidth;
          const maxHeight = window.innerHeight - 40;
          updateWindow(windowData.id, {
            size: { width: maxWidth, height: maxHeight },
            position: { x: 0, y: 0 }
          });
        }
      });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [windows, updateWindow]);

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

  // Enhanced center window function with better positioning
  const centerWindow = (size: { width: number; height: number }) => {
    const x = Math.max(0, (window.innerWidth - size.width) / 2);
    const y = Math.max(0, (window.innerHeight - size.height - 40) / 2); // Account for taskbar
    return { x, y };
  };

  const handleOpenWindow = (windowConfig: any) => {
    // Use fixed size of 800x600 for all windows
    const fixedSize = { width: 800, height: 600 };
    const centeredPosition = centerWindow(fixedSize);
    
    openWindow({
      ...windowConfig,
      position: centeredPosition,
      size: fixedSize
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
    { label: 'Properties', disabled: true }
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
            <div className="bg-gray-300 border-2 border-gray-400 shadow-lg min-w-[400px] min-h-[500px]" style={{ borderStyle: 'outset' }}>
              <div className="flex items-center justify-between px-4 py-2 bg-[#000080]">
                <span className="text-white text-xs font-bold">Display Properties</span>
                <button
                  className="w-5 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs"
                  style={{ borderStyle: 'outset' }}
                  onClick={() => setIsDisplayPropertiesOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="p-2">
                <DisplayProperties
                  selectedBackground={selectedBackground}
                  onBackgroundChange={setSelectedBackground}
                  onClose={() => setIsDisplayPropertiesOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
