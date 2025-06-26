import React, { useState, useEffect } from 'react';
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
import { desktopIcons, welcomeWindow } from '../config/desktopIcons';

export interface WindowData {
  id: string;
  title: string;
  component: React.ComponentType;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
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

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isShutdownDialogOpen, setIsShutdownDialogOpen] = useState(false);
  const [isShutdownScreenVisible, setIsShutdownScreenVisible] = useState(false);

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

  // Show welcome screen on startup
  useEffect(() => {
    const timer = setTimeout(() => {
      openWindow(welcomeWindow);
    }, 1000);
    return () => clearTimeout(timer);
  }, [openWindow]);

  // Center window function
  const centerWindow = (size: { width: number; height: number }) => {
    const x = Math.max(0, (window.innerWidth - size.width) / 2);
    const y = Math.max(0, (window.innerHeight - size.height - 40) / 2); // Account for taskbar
    return { x, y };
  };

  const handleOpenWindow = (windowConfig: any) => {
    const centeredPosition = centerWindow(windowConfig.size);
    openWindow({
      ...windowConfig,
      position: centeredPosition
    });
  };

  const handleShutdown = () => {
    setIsShutdownDialogOpen(true);
    setIsStartMenuOpen(false);
  };

  const confirmShutdown = () => {
    setIsShutdownDialogOpen(false);
    sounds.playShutdown();
    setTimeout(() => {
      setIsShutdownScreenVisible(true);
    }, 1000);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleDisplayProperties = () => {
    const centeredPosition = centerWindow({ width: 400, height: 500 });
    openWindow({
      title: 'Display Properties',
      component: () => (
        <DisplayProperties 
          selectedBackground={selectedBackground}
          onBackgroundChange={setSelectedBackground}
        />
      ),
      isMinimized: false,
      position: centeredPosition,
      size: { width: 400, height: 500 }
    });
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

        {windows.map(window => (
          <Window
            key={window.id}
            title={window.title}
            isActive={activeWindowId === window.id}
            isMinimized={window.isMinimized}
            position={window.position}
            size={window.size}
            zIndex={window.zIndex}
            onClose={() => closeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            onMinimize={() => updateWindow(window.id, { isMinimized: true })}
            onMaximize={() => {
              const isMaximized = window.size.width === window.innerWidth && window.size.height === window.innerHeight - 40;
              if (isMaximized) {
                // Restore to original size
                updateWindow(window.id, { 
                  size: { width: 500, height: 400 },
                  position: centerWindow({ width: 500, height: 400 })
                });
              } else {
                // Maximize
                updateWindow(window.id, { 
                  size: { width: window.innerWidth, height: window.innerHeight - 40 },
                  position: { x: 0, y: 0 }
                });
              }
            }}
            onUpdatePosition={(position) => updateWindow(window.id, { position })}
            onUpdateSize={(size) => updateWindow(window.id, { size })}
          >
            <window.component />
          </Window>
        ))}

        <ContextMenu
          isVisible={contextMenu.isVisible}
          position={contextMenu.position}
          onClose={closeContextMenu}
          items={contextMenu.type === 'desktop' ? desktopContextItems : iconContextItems}
        />

        {isStartMenuOpen && (
          <StartMenu 
            onClose={() => setIsStartMenuOpen(false)} 
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
            setIsStartMenuOpen(!isStartMenuOpen);
            sounds.playClick();
          }}
          isStartMenuOpen={isStartMenuOpen}
        />
      </div>
    </>
  );
};
