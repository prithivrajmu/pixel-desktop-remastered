
import { useState, useCallback } from 'react';
import { useScreenSize } from './use-mobile';

interface ContextMenuState {
  isVisible: boolean;
  position: { x: number; y: number };
  type: 'desktop' | 'icon';
  targetId?: string;
}

export const useContextMenu = () => {
  const screenSize = useScreenSize();
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isVisible: false,
    position: { x: 0, y: 0 },
    type: 'desktop'
  });

  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());

  // Enhanced context menu handler that works with both mouse and touch
  const showContextMenu = useCallback((
    event: React.MouseEvent | React.TouchEvent, 
    type: 'desktop' | 'icon', 
    iconId?: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const clientX = 'touches' in event ? event.touches[0]?.clientX || event.changedTouches[0]?.clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0]?.clientY || event.changedTouches[0]?.clientY : event.clientY;

    // Adjust position for mobile to ensure menu fits on screen
    let x = clientX;
    let y = clientY;

    const menuWidth = screenSize.isMobile ? 180 : 150;
    const menuHeight = screenSize.isMobile ? 200 : 150;

    if (screenSize.isMobile || screenSize.isTablet) {
      // Ensure menu doesn't go off screen
      x = Math.min(clientX, window.innerWidth - menuWidth - 10);
      y = Math.min(clientY, window.innerHeight - menuHeight - 10);
      x = Math.max(10, x);
      y = Math.max(10, y);
    }

    // Close any existing menu first
    setContextMenu({
      isVisible: false,
      position: { x: 0, y: 0 },
      type: 'desktop'
    });

    // Then open the new one
    setTimeout(() => {
      setContextMenu({
        isVisible: true,
        position: { x, y },
        type,
        targetId: iconId
      });
    }, 10);

    if (type === 'icon' && iconId) {
      setSelectedIcons(new Set([iconId]));
    } else {
      setSelectedIcons(new Set());
    }
  }, [screenSize.isMobile, screenSize.isTablet]);

  const handleDesktopRightClick = useCallback((e: React.MouseEvent) => {
    showContextMenu(e, 'desktop');
  }, [showContextMenu]);

  const handleIconRightClick = useCallback((e: React.MouseEvent, iconId: string) => {
    showContextMenu(e, 'icon', iconId);
  }, [showContextMenu]);

  // Touch long press handlers
  const handleDesktopLongPress = useCallback((e: React.TouchEvent) => {
    showContextMenu(e, 'desktop');
  }, [showContextMenu]);

  const handleIconLongPress = useCallback((e: React.TouchEvent, iconId: string) => {
    showContextMenu(e, 'icon', iconId);
  }, [showContextMenu]);

  const handleIconClick = useCallback((iconId: string) => {
    setSelectedIcons(new Set([iconId]));
    setContextMenu(prev => ({ ...prev, isVisible: false }));
  }, []);

  const handleDesktopClick = useCallback(() => {
    setSelectedIcons(new Set());
    setContextMenu(prev => ({ ...prev, isVisible: false }));
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    contextMenu,
    selectedIcons,
    handleDesktopRightClick,
    handleIconRightClick,
    handleDesktopLongPress,
    handleIconLongPress,
    handleIconClick,
    handleDesktopClick,
    closeContextMenu
  };
};
