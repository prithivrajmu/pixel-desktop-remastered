
import { useState, useCallback } from 'react';
import { WindowData } from '../components/Desktop';

export const useDesktopState = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [selectedBackground, setSelectedBackground] = useState('default');

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
  }, [nextZIndex]);

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

  return {
    windows,
    activeWindowId,
    nextZIndex,
    selectedBackground,
    openWindow,
    closeWindow,
    focusWindow,
    updateWindow,
    setSelectedBackground
  };
};
