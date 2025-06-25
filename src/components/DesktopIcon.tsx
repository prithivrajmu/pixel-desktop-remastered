
import React, { useState } from 'react';

interface DesktopIconProps {
  name: string;
  icon: string;
  position: { x: number; y: number };
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  name,
  icon,
  position,
  onDoubleClick,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setIsSelected(true);
    setClickCount(prev => prev + 1);
    
    setTimeout(() => {
      setClickCount(prev => {
        if (prev === 2) {
          onDoubleClick();
          setIsSelected(false);
          return 0;
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 300);

    // Auto-deselect after a while if no double-click
    setTimeout(() => {
      setIsSelected(false);
    }, 2000);
  };

  return (
    <div
      className={`absolute flex flex-col items-center cursor-pointer select-none w-16 ${
        isSelected ? 'bg-blue-600 bg-opacity-50' : ''
      }`}
      style={{ left: position.x, top: position.y }}
      onClick={handleClick}
    >
      <div className="text-3xl mb-1">{icon}</div>
      <span className={`text-xs text-center leading-tight ${
        isSelected ? 'text-white' : 'text-white drop-shadow-lg'
      }`}>
        {name}
      </span>
    </div>
  );
};
