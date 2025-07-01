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

  // Comprehensive responsive sizing based on screen dimensions
  const getResponsiveSizes = () => {
    const { width, height, isMobile, isTablet, isLandscape } = screenSize;
    
    // Base calculations
    const screenArea = width * height;
    const isSmallScreen = screenArea < 600000; // Very small screens
    const isMediumScreen = screenArea < 1200000; // Medium screens
    
    // Container size calculation
    let containerSize;
    if (isMobile) {
      containerSize = isSmallScreen ? 50 : 60;
    } else if (isTablet) {
      containerSize = isLandscape ? 68 : 76;
    } else {
      containerSize = isSmallScreen ? 56 : isMediumScreen ? 64 : 72;
    }
    
    // Icon size calculation
    let iconClass, iconTextClass;
    if (isMobile) {
      iconClass = isSmallScreen ? 'w-7 h-7' : 'w-9 h-9';
      iconTextClass = isSmallScreen ? 'text-2xl' : 'text-3xl';
    } else if (isTablet) {
      iconClass = isLandscape ? 'w-9 h-9' : 'w-10 h-10';
      iconTextClass = isLandscape ? 'text-3xl' : 'text-3xl';
    } else {
      iconClass = isSmallScreen ? 'w-7 h-7' : isMediumScreen ? 'w-8 h-8' : 'w-10 h-10';
      iconTextClass = isSmallScreen ? 'text-2xl' : isMediumScreen ? 'text-2xl' : 'text-3xl';
    }
    
    // Text size calculation
    let textClass;
    if (isMobile) {
      textClass = isSmallScreen ? 'text-xs' : 'text-xs';
    } else if (isTablet) {
      textClass = 'text-sm';
    } else {
      textClass = isSmallScreen ? 'text-xs' : 'text-sm';
    }
    
    // Text height calculation
    let textHeight;
    if (isMobile) {
      textHeight = isSmallScreen ? '16px' : '18px';
    } else if (isTablet) {
      textHeight = '20px';
    } else {
      textHeight = isSmallScreen ? '16px' : '18px';
    }
    
    return {
      containerSize,
      iconClass,
      iconTextClass,
      textClass,
      textHeight
    };
  };

  const sizes = getResponsiveSizes();
  const iconContainerSize = sizes.containerSize;
  const iconSize = sizes.iconClass;
  const iconTextSize = sizes.iconTextClass;
  const textSize = sizes.textClass;

  return (
    <div
      className={`absolute flex flex-col items-center cursor-pointer group ${
        longPressHandlers.isLongPressing ? 'opacity-75 scale-95' : ''
      }`}
      data-icon-element="true"
      style={{ 
        left: position.x, 
        top: position.y, 
        width: `${iconContainerSize}px`,
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
          maxWidth: `${iconContainerSize}px`,
          minHeight: sizes.textHeight,
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
