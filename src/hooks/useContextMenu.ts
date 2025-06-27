
import { useState } from 'react';

interface ContextMenuState {
  isVisible: boolean;
  position: { x: number; y: number };
  type: 'desktop' | 'icon';
  targetId?: string;
}

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isVisible: false,
    position: { x: 0, y: 0 },
    type: 'desktop'
  });

  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure we close any existing context menu first
    setContextMenu({
      isVisible: false,
      position: { x: 0, y: 0 },
      type: 'desktop'
    });
    
    // Then open the new one with a small delay to ensure proper rendering
    setTimeout(() => {
      setContextMenu({
        isVisible: true,
        position: { x: e.clientX, y: e.clientY },
        type: 'desktop'
      });
    }, 10);
    
    setSelectedIcons(new Set());
  };

  const handleIconRightClick = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure we close any existing context menu first
    setContextMenu({
      isVisible: false,
      position: { x: 0, y: 0 },
      type: 'icon'
    });
    
    // Then open the new one with a small delay to ensure proper rendering
    setTimeout(() => {
      setContextMenu({
        isVisible: true,
        position: { x: e.clientX, y: e.clientY },
        type: 'icon',
        targetId: iconId
      });
    }, 10);
    
    setSelectedIcons(new Set([iconId]));
  };

  const handleIconClick = (iconId: string) => {
    setSelectedIcons(new Set([iconId]));
    setContextMenu({ ...contextMenu, isVisible: false });
  };

  const handleDesktopClick = () => {
    setSelectedIcons(new Set());
    setContextMenu({ ...contextMenu, isVisible: false });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, isVisible: false });
  };

  return {
    contextMenu,
    selectedIcons,
    handleDesktopRightClick,
    handleIconRightClick,
    handleIconClick,
    handleDesktopClick,
    closeContextMenu
  };
};
