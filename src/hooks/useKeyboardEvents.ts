
import { useState, useEffect } from 'react';
import { WindowData } from '../components/Desktop';
import { useSounds } from '../components/SoundManager';

export const useKeyboardEvents = (windows: WindowData[], focusWindow: (id: string) => void) => {
  const [isAltTabOpen, setIsAltTabOpen] = useState(false);
  const [altTabIndex, setAltTabIndex] = useState(0);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const sounds = useSounds();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeysPressed = new Set(keysPressed);
      newKeysPressed.add(e.key);
      setKeysPressed(newKeysPressed);

      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        sounds.playMenuSelect();
        if (!isAltTabOpen && windows.length > 0) {
          setIsAltTabOpen(true);
          setAltTabIndex(0);
        } else if (isAltTabOpen) {
          setAltTabIndex(prev => (prev + 1) % windows.length);
        }
      }

      if (isAltTabOpen && e.key === 'Enter') {
        sounds.playClick();
        handleAltTabSelect();
      }

      if (isAltTabOpen && e.key === 'Escape') {
        sounds.playError();
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

  return {
    isAltTabOpen,
    altTabIndex,
    handleAltTabSelect,
    setIsAltTabOpen
  };
};
