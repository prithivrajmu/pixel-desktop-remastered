import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import { Minus, X, Square } from 'lucide-react';
import { useSounds } from './SoundManager';
import { useScreenSize } from '../hooks/use-mobile';

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
  const screenSize = useScreenSize();

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
    const taskbarHeight = screenSize.isMobile ? 48 : 28;
    
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height - taskbarHeight, e.clientY - dragStart.y));
      
      onUpdatePosition({ x: newX, y: newY });
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const minWidth = screenSize.isMobile ? 250 : 300;
      const minHeight = screenSize.isMobile ? 150 : 200;
      const newWidth = Math.max(minWidth, Math.min(window.innerWidth - position.x, resizeStart.width + deltaX));
      const newHeight = Math.max(minHeight, Math.min(window.innerHeight - position.y - taskbarHeight, resizeStart.height + deltaY));
      
      onUpdateSize({ width: newWidth, height: newHeight });
    }
  }, [isDragging, isResizing, dragStart, resizeStart, size, position, onUpdatePosition, onUpdateSize, screenSize]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    const taskbarHeight = screenSize.isMobile ? 48 : 28;
    
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, touch.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height - taskbarHeight, touch.clientY - dragStart.y));
      
      onUpdatePosition({ x: newX, y: newY });
    }
  }, [isDragging, dragStart, size, onUpdatePosition, screenSize]);

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
        className={`title-bar px-2 flex items-center justify-between cursor-move ${
          isActive 
            ? 'bg-[#000080]' 
            : 'bg-[#808080]'
        }`}
        style={{ 
          height: screenSize.isMobile ? '32px' : '28px',
          fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',
          touchAction: 'none'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center space-x-1">
          {icon && (
            <img 
              src={icon} 
              alt="Window Icon" 
              className={screenSize.isMobile ? "w-5 h-5" : "w-4 h-4"} 
            />
          )}
          <span className={`text-white font-bold truncate ${
            screenSize.isMobile ? 'text-sm' : 'text-xs'
          }`}>
            {title}
          </span>
        </div>
        <div className="flex space-x-px">
          <button
            className={`bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              width: screenSize.isMobile ? '24px' : '20px',
              height: screenSize.isMobile ? '18px' : '16px',
              borderStyle: 'outset',
              fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',
              touchAction: 'manipulation'
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
            className={`bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              width: screenSize.isMobile ? '24px' : '20px',
              height: screenSize.isMobile ? '18px' : '16px',
              borderStyle: 'outset',
              fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',
              touchAction: 'manipulation'
            }}
            onClick={(e) => {
              e.stopPropagation();
              sounds.playWindowMaximize();
              onMaximize();
            }}
          >
            <Square size={screenSize.isMobile ? 8 : 6} />
          </button>
          <button
            className={`bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              width: screenSize.isMobile ? '24px' : '20px',
              height: screenSize.isMobile ? '18px' : '16px',
              borderStyle: 'outset',
              fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',
              touchAction: 'manipulation'
            }}
            onClick={(e) => {
              e.stopPropagation();
              sounds.playWindowClose();
              onClose();
            }}
          >
            <X size={screenSize.isMobile ? 10 : 8} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        ref={contentRef}
        className="bg-white flex flex-col justify-start" 
        style={{ 
          height: `calc(100% - ${screenSize.isMobile ? '32px' : '28px'})`,
          overflow: 'auto',
          fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',
          // Better scrolling on mobile
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {children}
      </div>

      {/* Resize Handle - Only show on desktop/tablet as mobile windows are typically fullscreen */}
      {!screenSize.isMobile && (
        <div
          className={`absolute bottom-0 right-0 cursor-nw-resize ${
            screenSize.isTablet ? 'w-4 h-4' : 'w-3 h-3'
          }`}
          onMouseDown={handleResizeMouseDown}
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              #c0c0c0,
              #c0c0c0 1px,
              #808080 1px,
              #808080 2px
            )`,
            touchAction: 'none'
          }}
        />
      )}
    </div>
  );
});

Window.displayName = 'Window';
