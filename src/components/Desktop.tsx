
import React, { useState, useCallback, useEffect } from 'react';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { DesktopIcon } from './DesktopIcon';
import { StartMenu } from './StartMenu';
import { WindowSwitcher } from './WindowSwitcher';
import { ShutdownDialog } from './ShutdownDialog';
import { ShutdownScreen } from './ShutdownScreen';
import { ContextMenu } from './ContextMenu';
import { SoundManager, useSounds } from './SoundManager';
import { IconManager } from './IconManager';
import { BackgroundManager } from './BackgroundManager';
import { useDesktopState } from '../hooks/useDesktopState';
import { useKeyboardEvents } from '../hooks/useKeyboardEvents';
import { useContextMenu } from '../hooks/useContextMenu';
import { desktopIcons } from '../config/desktopIcons';

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
    nextZIndex,
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
    handleAltTabSelect
  } = useKeyboardEvents(windows, focusWindow);

  const sounds = useSounds();

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

  const desktopContextItems = [
    { label: 'Arrange Icons', icon: '🔧', disabled: true },
    { label: 'Line up Icons', icon: '📐', disabled: true },
    { separator: true },
    { label: 'Paste', icon: '📋', disabled: true },
    { label: 'Paste Shortcut', icon: '🔗', disabled: true },
    { separator: true },
    { label: 'New', icon: '📄', disabled: true },
    { separator: true },
    { label: 'Properties', icon: '⚙️', onClick: () => {
      console.log('Display Properties');
    }}
  ];

  const iconContextItems = [
    { label: 'Open', icon: '📂', onClick: () => {
      const icon = desktopIcons.find(i => i.id === contextMenu.targetId);
      if (icon) icon.onDoubleClick();
    }},
    { separator: true },
    { label: 'Cut', icon: '✂️', disabled: true },
    { label: 'Copy', icon: '📋', disabled: true },
    { separator: true },
    { label: 'Create Shortcut', icon: '🔗', disabled: true },
    { label: 'Delete', icon: '🗑️', disabled: true },
    { label: 'Rename', icon: '✏️', disabled: true },
    { separator: true },
    { label: 'Properties', icon: '⚙️', disabled: true }
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
            onDoubleClick={() => openWindow(icon.windowConfig)}
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
          onWindowClick={focusWindow}
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
