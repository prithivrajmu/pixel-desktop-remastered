import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Minus, X, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  isActive,
  isMinimized,
  position,
  size,
  zIndex,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  onUpdateSize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-resize to content on mount
  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const contentWidth = contentRef.current.scrollWidth;
      
      // Only resize if content is smaller than current window
      if (contentHeight < size.height - 32 || contentWidth < size.width) {
        const newHeight = Math.max(200, Math.min(contentHeight + 60, window.innerHeight - 100));
        const newWidth = Math.max(300, Math.min(contentWidth + 40, window.innerWidth - 100));
        
        if (newHeight !== size.height || newWidth !== size.width) {
          onUpdateSize({ width: newWidth, height: newHeight });
        }
      }
    }
  }, [children]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('title-bar')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      onFocus();
    }
  }, [position, onFocus]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('title-bar')) {
      // Start long press timer for context menu
      const timer = setTimeout(() => {
        // Trigger right-click behavior
        const syntheticEvent = new MouseEvent('contextmenu', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          bubbles: true
        });
        e.currentTarget.dispatchEvent(syntheticEvent);
      }, 500);
      
      setLongPressTimer(timer);
      
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
      onFocus();
    }
  }, [position, onFocus]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [longPressTimer]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    onFocus();
  }, [size, onFocus]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height - 40, e.clientY - dragStart.y));
      
      onUpdatePosition({ x: newX, y: newY });
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(300, Math.min(window.innerWidth - position.x, resizeStart.width + deltaX));
      const newHeight = Math.max(200, Math.min(window.innerHeight - position.y - 40, resizeStart.height + deltaY));
      
      onUpdateSize({ width: newWidth, height: newHeight });
    }
  }, [isDragging, isResizing, dragStart, resizeStart, size, position, onUpdatePosition, onUpdateSize]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, touch.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height - 40, touch.clientY - dragStart.y));
      
      onUpdatePosition({ x: newX, y: newY });
    }
  }, [isDragging, dragStart, size, onUpdatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleTouchMove, handleMouseUp]);

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`absolute bg-gray-300 border-2 shadow-lg ${
        isActive ? 'border-gray-400' : 'border-gray-500'
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        borderStyle: 'outset',
        fontFamily: '"MS Sans Serif", sans-serif'
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`title-bar h-7 px-2 flex items-center justify-between cursor-move ${
          isActive 
            ? 'bg-gradient-to-r from-blue-800 to-blue-600' 
            : 'bg-gradient-to-r from-gray-600 to-gray-500'
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <span className="text-white text-xs font-bold truncate">{title}</span>
        <div className="flex space-x-px">
          <button
            className="w-5 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs"
            style={{ borderStyle: 'outset' }}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          >
            <Minus size={8} />
          </button>
          <button
            className="w-5 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs"
            style={{ borderStyle: 'outset' }}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
          >
            <Square size={6} />
          </button>
          <button
            className="w-5 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs"
            style={{ borderStyle: 'outset' }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X size={8} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        ref={contentRef}
        className="bg-white overflow-auto" 
        style={{ height: 'calc(100% - 28px)' }}
      >
        {children}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-3 h-3 cursor-nw-resize"
        onMouseDown={handleResizeMouseDown}
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            #c0c0c0,
            #c0c0c0 1px,
            #808080 1px,
            #808080 2px
          )`
        }}
      />
    </div>
  );
};
