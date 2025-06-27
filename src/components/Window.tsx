import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import { Minus, X, Square } from 'lucide-react';
import { useSounds } from './SoundManager';

interface WindowProps {
  title: string;
  icon?: string;
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

export const Window: React.FC<WindowProps> = memo(({
  title,
  icon,
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
  const sounds = useSounds();

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

  // Play window open sound on mount
  useEffect(() => {
    sounds.playWindowOpen();
  }, [sounds]);

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
        fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif'
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`title-bar h-7 px-2 flex items-center justify-between cursor-move ${
          isActive 
            ? 'bg-[#000080]' 
            : 'bg-[#808080]'
        }`}
        style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center space-x-1">
          {icon && <img src={icon} alt="Window Icon" className="w-4 h-4" />}
          <span className="text-white text-xs font-bold truncate">{title}</span>
        </div>
        <div className="flex space-x-px">
          <button
            className="w-5 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs"
            style={{ 
              borderStyle: 'outset',
              fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif'
            }}
            onClick={(e) => {
              e.stopPropagation();
              sounds.playWindowMinimize();
              onMinimize();
            }}
          >
            <Minus size={8} />
          </button>
          <button
            className="w-5 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs"
            style={{ 
              borderStyle: 'outset',
              fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif'
            }}
            onClick={(e) => {
              e.stopPropagation();
              sounds.playWindowMaximize();
              onMaximize();
            }}
          >
            <Square size={6} />
          </button>
          <button
            className="w-5 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs"
            style={{ 
              borderStyle: 'outset',
              fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif'
            }}
            onClick={(e) => {
              e.stopPropagation();
              sounds.playWindowClose();
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
        className="bg-white flex flex-col justify-start" 
        style={{ 
          height: 'calc(100% - 28px)',
          overflow: 'auto', // Will only show scrollbars if content is larger than container
          fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif'
        }}
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
});

Window.displayName = 'Window';
