
import React, { useState } from 'react';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  isSelected?: boolean;
  onDoubleClick: () => void;
  onClick?: () => void;
  onRightClick?: (e: React.MouseEvent) => void;
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
  tooltip
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
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

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group"
      style={{ left: position.x, top: position.y, width: '64px' }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
    >
      <div 
        className={`w-8 h-8 flex items-center justify-center text-2xl mb-1 ${
          isSelected ? 'bg-blue-600' : ''
        }`}
      >
        {icon}
      </div>
      <div 
        className={`text-xs text-center leading-tight px-1 py-0.5 ${
          isSelected 
            ? 'bg-blue-600 text-white' 
            : 'text-white drop-shadow-sm'
        }`}
        style={{ 
          textShadow: isSelected ? 'none' : '1px 1px 1px rgba(0,0,0,0.8)',
          wordWrap: 'normal',
          maxWidth: '64px'
        }}
      >
        {name}
      </div>

      {showTooltip && !isSelected && (
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
