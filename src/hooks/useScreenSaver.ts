import { useState, useEffect, useRef, useCallback } from 'react';

interface ScreenSaverSettings {
  isEnabled: boolean;
  timeoutMinutes: number;
  selectedScreensaver: string;
}

export const useScreenSaver = (initialSettings: ScreenSaverSettings = {
  isEnabled: true,
  timeoutMinutes: 5,
  selectedScreensaver: 'default'
}) => {
  const [isActive, setIsActive] = useState(false);
  const [settings, setSettings] = useState<ScreenSaverSettings>(initialSettings);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (settings.isEnabled) {
      timeoutRef.current = setTimeout(() => {
        setIsActive(true);
      }, settings.timeoutMinutes * 60 * 1000);
    }
  }, [settings.isEnabled, settings.timeoutMinutes]);

  const handleActivity = useCallback(() => {
    if (isActive) {
      setIsActive(false);
    }
    lastActivityRef.current = Date.now();
    resetTimer();
  }, [isActive, resetTimer]);

  const updateSettings = useCallback((newSettings: Partial<ScreenSaverSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    resetTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleActivity, resetTimer]);

  useEffect(() => {
    resetTimer();
  }, [settings, resetTimer]);

  return {
    isActive,
    settings,
    updateSettings,
    deactivate: () => setIsActive(false)
  };
}; 