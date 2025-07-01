import React, { useState } from 'react';
import { useScreenSize } from '../hooks/use-mobile';
import { useLongPress } from '../hooks/useLongPress';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  isSelected?: boolean;
  onDoubleClick: () => void;
  onClick?: () => void;
  onRightClick?: (e: React.MouseEvent) => void;
  onLongPress?: (e: React.TouchEvent) => void;
  tooltip?: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  name,
  icon,
  position,
  isSelected = false,
  onDoubleClick,
  onClick,
  onRightClick,
  onLongPress,
  tooltip
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const screenSize = useScreenSize();

  // Long press functionality for touch devices
  const longPressHandlers = useLongPress({
    onLongPress: (event) => {
      if ('touches' in event && onLongPress) {
        onLongPress(event as React.TouchEvent);
      }
    },
    onPress: (event) => {
      if ('touches' in event && onClick) {
        // Handle regular tap on touch devices
        onClick();
      }
    },
    delay: 500,
    threshold: 10
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick && !screenSize.isTouchDevice) {
      onClick();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDoubleClick();
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRightClick) onRightClick(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Responsive sizing
  const iconSize = screenSize.isMobile ? 'w-12 h-12' : 'w-8 h-8';
  const iconTextSize = screenSize.isMobile ? 'text-4xl' : 'text-2xl';
  const containerWidth = screenSize.isMobile ? '80px' : '64px';
  const textSize = screenSize.isMobile ? 'text-sm' : 'text-xs';

  return (
    <div
      className={`absolute flex flex-col items-center cursor-pointer group ${
        longPressHandlers.isLongPressing ? 'opacity-75 scale-95' : ''
      }`}
      data-icon-element="true"
      style={{ 
        left: position.x, 
        top: position.y, 
        width: containerWidth,
        touchAction: 'manipulation',
        transition: 'opacity 0.2s, transform 0.2s'
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
      onMouseEnter={() => !screenSize.isTouchDevice && setShowTooltip(true)}
      onMouseLeave={() => !screenSize.isTouchDevice && setShowTooltip(false)}
      onMouseMove={handleMouseMove}
      {...(screenSize.isTouchDevice ? {
        onTouchStart: longPressHandlers.onTouchStart,
        onTouchEnd: longPressHandlers.onTouchEnd,
        onTouchMove: longPressHandlers.onTouchMove
      } : {})}
    >
      <div 
        className={`${iconSize} flex items-center justify-center ${iconTextSize} mb-1 ${
          isSelected ? 'bg-blue-600' : ''
        } ${longPressHandlers.isLongPressing ? 'bg-blue-300 border-2 border-blue-500' : ''}`}
        style={{
          minHeight: screenSize.isMobile ? '48px' : '32px',
          minWidth: screenSize.isMobile ? '48px' : '32px',
          borderRadius: longPressHandlers.isLongPressing ? '6px' : '0px',
          transition: 'all 0.2s ease',
          transform: longPressHandlers.isLongPressing ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        {icon}
      </div>
      <div 
        className={`${textSize} text-center leading-tight px-1 py-0.5 ${
          isSelected 
            ? 'bg-blue-600 text-white' 
            : longPressHandlers.isLongPressing 
              ? 'bg-blue-300 text-black font-semibold'
              : 'text-white drop-shadow-sm'
        }`}
        style={{ 
          textShadow: (isSelected || longPressHandlers.isLongPressing) ? 'none' : '1px 1px 1px rgba(0,0,0,0.8)',
          wordWrap: 'normal',
          maxWidth: containerWidth,
          minHeight: screenSize.isMobile ? '24px' : '16px',
          borderRadius: longPressHandlers.isLongPressing ? '4px' : '0px',
          transition: 'all 0.2s ease'
        }}
      >
        {name}
      </div>

      {showTooltip && !isSelected && !screenSize.isTouchDevice && (
        <div 
          className="fixed bg-yellow-100 border border-black px-2 py-1 text-xs whitespace-nowrap z-50 pointer-events-none"
          style={{ 
            left: mousePosition.x + 10,
            top: mousePosition.y - 30,
            fontFamily: '"MS Sans Serif", sans-serif'
          }}
        >
          {tooltip || name}
        </div>
      )}
    </div>
  );
};
