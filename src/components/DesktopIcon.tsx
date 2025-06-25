
import React, { useState } from 'react';

interface DesktopIconProps {
  name: string;
  icon: string;
  position: { x: number; y: number };
  isSelected?: boolean;
  onDoubleClick: () => void;
  onClick?: () => void;
  onRightClick?: (e: React.MouseEvent) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  name,
  icon,
  position,
  isSelected = false,
  onDoubleClick,
  onClick,
  onRightClick
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDoubleClick();
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRightClick) onRightClick(e);
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
          wordWrap: 'break-word',
          maxWidth: '64px'
        }}
      >
        {name}
      </div>

      {/* Tooltip */}
      {showTooltip && !isSelected && (
        <div 
          className="absolute bg-yellow-100 border border-black px-2 py-1 text-xs whitespace-nowrap z-50"
          style={{ 
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: '"MS Sans Serif", sans-serif'
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};
