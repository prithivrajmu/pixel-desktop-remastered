import { useCallback } from 'react';

interface DialogPosition {
  left: number;
  top: number;
}

interface UseDialogPositionProps {
  dialogWidth: number;
  dialogHeight: number;
  triggerPosition: { left: number; top: number; bottom?: number };
  preferredAlignment?: 'left' | 'center' | 'right';
  preferredDirection?: 'above' | 'below';
}

export const useDialogPosition = () => {
  const calculatePosition = useCallback(({
    dialogWidth,
    dialogHeight,
    triggerPosition,
    preferredAlignment = 'center',
    preferredDirection = 'above'
  }: UseDialogPositionProps): DialogPosition => {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Find taskbar element to get its position
    const taskbar = document.querySelector('[data-taskbar]') as HTMLElement;
    const taskbarTop = taskbar ? taskbar.getBoundingClientRect().top : viewportHeight - 28; // fallback
    const availableHeight = taskbarTop - 8; // 8px margin from top
    
    // Calculate horizontal position based on preferred alignment
    let left: number;
    switch (preferredAlignment) {
      case 'left':
        left = triggerPosition.left;
        break;
      case 'right':
        left = triggerPosition.left - dialogWidth;
        break;
      case 'center':
      default:
        left = triggerPosition.left - (dialogWidth / 2);
        break;
    }
    
    // Calculate vertical position based on preferred direction
    let top: number;
    if (preferredDirection === 'above') {
      // Use trigger's bottom position if available, otherwise use top
      const triggerBottom = triggerPosition.bottom || triggerPosition.top;
      top = triggerBottom - dialogHeight - 8;
    } else {
      top = triggerPosition.top + 8;
    }
    
    // Clamp horizontal position to stay within viewport
    if (left < 8) left = 8;
    if (left + dialogWidth > viewportWidth - 8) {
      left = viewportWidth - dialogWidth - 8;
    }
    
    // Clamp vertical position to stay above taskbar and within viewport
    if (top < 8) top = 8;
    if (top + dialogHeight > availableHeight) {
      // If dialog would go below taskbar, position it above the trigger
      const triggerBottom = triggerPosition.bottom || triggerPosition.top;
      top = triggerBottom - dialogHeight - 8;
      // If still too high, clamp to top
      if (top < 8) top = 8;
    }
    
    return { left, top };
  }, []);

  return { calculatePosition };
}; 