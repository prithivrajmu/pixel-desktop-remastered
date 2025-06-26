
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
