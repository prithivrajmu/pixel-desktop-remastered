
import React, { useState, useRef, useCallback } from 'react';
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
  onUpdatePosition,
  onUpdateSize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height - 40, e.clientY - dragStart.y));
      
      onUpdatePosition({ x: newX, y: newY });
    }
  }, [isDragging, dragStart, size, onUpdatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`title-bar h-8 px-2 flex items-center justify-between cursor-move ${
          isActive ? 'bg-blue-600' : 'bg-gray-500'
        }`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-white text-sm font-bold truncate">{title}</span>
        <div className="flex space-x-1">
          <button
            className="w-6 h-6 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
          >
            <Minus size={12} />
          </button>
          <button
            className="w-6 h-6 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
          >
            <Square size={10} />
          </button>
          <button
            className="w-6 h-6 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full bg-white overflow-auto" style={{ height: 'calc(100% - 32px)' }}>
        {children}
      </div>
    </div>
  );
};
