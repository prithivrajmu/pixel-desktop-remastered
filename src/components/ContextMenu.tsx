
import React from 'react';

interface ContextMenuProps {
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  items: {
    label?: string;
    icon?: string;
    onClick?: () => void;
    disabled?: boolean;
    separator?: boolean;
  }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isVisible,
  position,
  onClose,
  items
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed bg-gray-300 border-2 border-gray-400 shadow-lg z-50 min-w-32"
      style={{ 
        left: position.x, 
        top: position.y,
        borderStyle: 'outset'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return <div key={index} className="h-px bg-gray-400 mx-1 my-1" />;
        }
        
        return (
          <div
            key={index}
            className={`px-4 py-2 text-sm cursor-pointer flex items-center space-x-2 ${
              item.disabled 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'hover:bg-blue-600 hover:text-white'
            }`}
            onClick={() => {
              if (!item.disabled && item.onClick) {
                item.onClick();
                onClose();
              }
            }}
          >
            {item.icon && <span className="w-4">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};
