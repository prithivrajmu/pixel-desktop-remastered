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

// Application imports
import { MyComputer } from './applications/MyComputer';
import { MyDocuments } from './applications/MyDocuments';
import { InternetExplorer } from './applications/InternetExplorer';
import { Notepad } from './applications/Notepad';
import { RecycleBin } from './applications/RecycleBin';

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
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(10);
  
  // Alt+Tab functionality
  const [isAltTabOpen, setIsAltTabOpen] = useState(false);
  const [altTabIndex, setAltTabIndex] = useState(0);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  
  // Shutdown functionality
  const [isShutdownDialogOpen, setIsShutdownDialogOpen] = useState(false);
  const [isShutdownScreenVisible, setIsShutdownScreenVisible] = useState(false);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    isVisible: boolean;
    position: { x: number; y: number };
    type: 'desktop' | 'icon';
    targetId?: string;
  }>({
    isVisible: false,
    position: { x: 0, y: 0 },
    type: 'desktop'
  });

  // Selected icons state
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());

  const sounds = useSounds();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeysPressed = new Set(keysPressed);
      newKeysPressed.add(e.key);
      setKeysPressed(newKeysPressed);

      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        if (!isAltTabOpen && windows.length > 0) {
          setIsAltTabOpen(true);
          setAltTabIndex(0);
        } else if (isAltTabOpen) {
          setAltTabIndex(prev => (prev + 1) % windows.length);
        }
      }

      if (isAltTabOpen && e.key === 'Enter') {
        handleAltTabSelect();
      }

      if (isAltTabOpen && e.key === 'Escape') {
        setIsAltTabOpen(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const newKeysPressed = new Set(keysPressed);
      newKeysPressed.delete(e.key);
      setKeysPressed(newKeysPressed);

      if (e.key === 'Alt' && isAltTabOpen) {
        handleAltTabSelect();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [keysPressed, isAltTabOpen, windows, altTabIndex]);

  const handleAltTabSelect = () => {
    if (windows.length > 0) {
      const selectedWindow = windows[altTabIndex];
      if (selectedWindow) {
        focusWindow(selectedWindow.id);
      }
    }
    setIsAltTabOpen(false);
    setAltTabIndex(0);
  };

  const openWindow = useCallback((windowData: Omit<WindowData, 'id' | 'zIndex'>) => {
    const id = `window-${Date.now()}`;
    const newWindow: WindowData = {
      ...windowData,
      id,
      zIndex: nextZIndex,
    };
    
    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(id);
    setNextZIndex(prev => prev + 1);
    sounds.playClick();
  }, [nextZIndex, sounds]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setActiveWindowId(prev => prev === id ? null : prev);
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id);
    setWindows(prev => 
      prev.map(w => 
        w.id === id 
          ? { ...w, zIndex: nextZIndex, isMinimized: false }
          : w
      )
    );
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const updateWindow = useCallback((id: string, updates: Partial<WindowData>) => {
    setWindows(prev => 
      prev.map(w => w.id === id ? { ...w, ...updates } : w)
    );
  }, []);

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

  // Context menu handlers
  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isVisible: true,
      position: { x: e.clientX, y: e.clientY },
      type: 'desktop'
    });
    setSelectedIcons(new Set());
  };

  const handleIconRightClick = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      isVisible: true,
      position: { x: e.clientX, y: e.clientY },
      type: 'icon',
      targetId: iconId
    });
    setSelectedIcons(new Set([iconId]));
  };

  const handleIconClick = (iconId: string) => {
    setSelectedIcons(new Set([iconId]));
    setContextMenu({ ...contextMenu, isVisible: false });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, isVisible: false });
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
    { label: 'Properties', icon: '⚙️', disabled: true }
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

  const desktopIcons = [
    { 
      id: 'my-computer', 
      name: 'My Computer', 
      icon: '💻', 
      position: { x: 20, y: 20 },
      onDoubleClick: () => openWindow({
        title: 'My Computer',
        component: MyComputer,
        isMinimized: false,
        position: { x: 100, y: 100 },
        size: { width: 500, height: 400 }
      })
    },
    { 
      id: 'my-documents', 
      name: 'My Documents', 
      icon: '📁', 
      position: { x: 20, y: 120 },
      onDoubleClick: () => openWindow({
        title: 'My Documents',
        component: MyDocuments,
        isMinimized: false,
        position: { x: 150, y: 150 },
        size: { width: 600, height: 500 }
      })
    },
    { 
      id: 'internet-explorer', 
      name: 'Internet Explorer', 
      icon: '🌐', 
      position: { x: 20, y: 220 },
      onDoubleClick: () => openWindow({
        title: 'Internet Explorer',
        component: InternetExplorer,
        isMinimized: false,
        position: { x: 200, y: 100 },
        size: { width: 700, height: 500 }
      })
    },
    { 
      id: 'notepad', 
      name: 'Notepad', 
      icon: '📝', 
      position: { x: 20, y: 320 },
      onDoubleClick: () => openWindow({
        title: 'Contact - Notepad',
        component: Notepad,
        isMinimized: false,
        position: { x: 200, y: 200 },
        size: { width: 500, height: 400 }
      })
    },
    { 
      id: 'recycle-bin', 
      name: 'Recycle Bin', 
      icon: '🗑️', 
      position: { x: 20, y: 420 },
      onDoubleClick: () => openWindow({
        title: 'Recycle Bin',
        component: RecycleBin,
        isMinimized: false,
        position: { x: 250, y: 250 },
        size: { width: 450, height: 400 }
      })
    }
  ];

  return (
    <>
      <SoundManager />
      <div 
        className="w-full h-screen bg-teal-600 relative overflow-hidden select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          fontFamily: '"MS Sans Serif", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}
        onClick={(e) => {
          setIsStartMenuOpen(false);
          closeContextMenu();
          setSelectedIcons(new Set());
        }}
        onContextMenu={handleDesktopRightClick}
      >
        {/* Desktop Icons */}
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            name={icon.name}
            icon={icon.icon}
            position={icon.position}
            isSelected={selectedIcons.has(icon.id)}
            onDoubleClick={icon.onDoubleClick}
            onClick={() => handleIconClick(icon.id)}
            onRightClick={(e) => handleIconRightClick(e, icon.id)}
          />
        ))}

        {/* Windows */}
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

        {/* Context Menu */}
        <ContextMenu
          isVisible={contextMenu.isVisible}
          position={contextMenu.position}
          onClose={closeContextMenu}
          items={contextMenu.type === 'desktop' ? desktopContextItems : iconContextItems}
        />

        {/* Start Menu */}
        {isStartMenuOpen && (
          <StartMenu 
            onClose={() => setIsStartMenuOpen(false)} 
            onShutdown={handleShutdown}
          />
        )}

        {/* Alt+Tab Window Switcher */}
        <WindowSwitcher
          isVisible={isAltTabOpen}
          windows={windows}
          selectedIndex={altTabIndex}
          onSelect={focusWindow}
          onClose={() => setIsAltTabOpen(false)}
        />

        {/* Shutdown Dialog */}
        <ShutdownDialog
          isOpen={isShutdownDialogOpen}
          onConfirm={confirmShutdown}
          onCancel={() => setIsShutdownDialogOpen(false)}
        />

        {/* Shutdown Screen */}
        <ShutdownScreen
          isVisible={isShutdownScreenVisible}
          onRestart={handleRestart}
        />

        {/* Taskbar */}
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
