import { useCallback, useRef, useState } from 'react';
import { useScreenSize } from './use-mobile';

interface LongPressOptions {
  delay?: number;
  onLongPress: (event: React.TouchEvent | React.MouseEvent) => void;
  onPress?: (event: React.TouchEvent | React.MouseEvent) => void;
  preventDefault?: boolean;
  threshold?: number; // Movement threshold to cancel long press
}

interface LongPressResult {
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
  onTouchMove: (event: React.TouchEvent) => void;
  isLongPressing: boolean;
}

export const useLongPress = (options: LongPressOptions): LongPressResult => {
  const { delay = 500, onLongPress, onPress, preventDefault = true, threshold = 10 } = options;
  const screenSize = useScreenSize();
  
  const [isLongPressing, setIsLongPressing] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const longPressTriggered = useRef(false);

  const start = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (preventDefault && event.target) {
        event.preventDefault();
      }
      
      // Reset state
      longPressTriggered.current = false;
      setIsLongPressing(false);
      
      // Store initial position for movement detection
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      startPosition.current = { x: clientX, y: clientY };
      
      target.current = event.target;
      
      // On touch devices, show visual feedback immediately
      if (screenSize.isTouchDevice) {
        setIsLongPressing(true);
        // Add haptic feedback on supported devices
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }

      timeout.current = setTimeout(() => {
        longPressTriggered.current = true;
        setIsLongPressing(false);
        onLongPress(event);
        // Stronger haptic feedback when long press triggers
        if ('vibrate' in navigator && screenSize.isTouchDevice) {
          navigator.vibrate(100);
        }
      }, delay);
    },
    [delay, onLongPress, preventDefault, screenSize.isTouchDevice]
  );

  const clear = useCallback(
    (event: React.TouchEvent | React.MouseEvent, shouldTriggerPress = true) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      
      setIsLongPressing(false);

      if (shouldTriggerPress && !longPressTriggered.current && onPress) {
        onPress(event);
      }
      
      longPressTriggered.current = false;
    },
    [onPress]
  );

  const checkMovement = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (!timeout.current) return;

      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      
      const deltaX = Math.abs(clientX - startPosition.current.x);
      const deltaY = Math.abs(clientY - startPosition.current.y);
      
      // If movement exceeds threshold, cancel long press
      if (deltaX > threshold || deltaY > threshold) {
        clear(event, false);
      }
    },
    [clear, threshold]
  );

  return {
    onMouseDown: (event: React.MouseEvent) => {
      // Only handle mouse events on non-touch devices
      if (!screenSize.isTouchDevice) {
        start(event);
      }
    },
    onMouseUp: (event: React.MouseEvent) => {
      if (!screenSize.isTouchDevice) {
        clear(event);
      }
    },
    onMouseLeave: (event: React.MouseEvent) => {
      if (!screenSize.isTouchDevice) {
        clear(event, false);
      }
    },
    onTouchStart: (event: React.TouchEvent) => {
      start(event);
    },
    onTouchEnd: (event: React.TouchEvent) => {
      clear(event);
    },
    onTouchMove: (event: React.TouchEvent) => {
      checkMovement(event);
    },
    isLongPressing
  };
}; 