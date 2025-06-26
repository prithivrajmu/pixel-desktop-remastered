
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

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
    hasSubmenu?: boolean;
    submenu?: {
      label?: string;
      icon?: string;
      onClick?: () => void;
      disabled?: boolean;
      separator?: boolean;
    }[];
  }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isVisible,
  position,
  onClose,
  items
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  if (!isVisible) return null;

  const handleItemHover = (label: string, hasSubmenu?: boolean) => {
    if (hasSubmenu) {
      setActiveSubmenu(label);
    } else {
      setActiveSubmenu(null);
    }
  };

  const renderSubmenu = (submenuItems: any[], parentLabel: string) => (
    <div 
      className="absolute left-full top-0 w-36 bg-gray-300 border-2 border-gray-400 shadow-lg z-50"
      style={{ 
        borderStyle: 'outset',
        fontSize: '11px',
        fontFamily: '"MS Sans Serif", sans-serif'
      }}
    >
      {submenuItems.map((item, index) => {
        if (item.separator) {
          return <div key={index} className="h-px bg-gray-400 mx-1 my-1" />;
        }
        
        return (
          <div
            key={index}
            className={`px-3 py-1 text-xs cursor-pointer flex items-center space-x-2 ${
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
            {item.icon && <span className="w-4 text-center">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div 
      className="fixed bg-gray-300 border-2 border-gray-400 shadow-lg z-50 min-w-36"
      style={{ 
        left: position.x, 
        top: position.y,
        borderStyle: 'outset',
        fontSize: '11px',
        fontFamily: '"MS Sans Serif", sans-serif'
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
            className={`px-3 py-1 text-xs cursor-pointer flex items-center space-x-2 relative group ${
              item.disabled 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'hover:bg-blue-600 hover:text-white'
            }`}
            onMouseEnter={() => handleItemHover(item.label || '', item.hasSubmenu)}
            onClick={() => {
              if (!item.disabled && item.onClick && !item.hasSubmenu) {
                item.onClick();
                onClose();
              }
            }}
          >
            {item.icon && <span className="w-4 text-center">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            {item.hasSubmenu && (
              <>
                <ChevronRight size={8} className="ml-1" />
                {activeSubmenu === item.label && item.submenu && (
                  <div className="group-hover:block">
                    {renderSubmenu(item.submenu, item.label || '')}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
