import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useScreenSize } from '../hooks/use-mobile';

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
  const screenSize = useScreenSize();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  if (!isVisible) return null;

  // Touch-friendly item handling
  const handleItemClick = (item: any) => {
    if (screenSize.isTouchDevice) {
      // On touch devices, single tap to execute or toggle submenu
      if (!item.disabled && item.onClick && !item.hasSubmenu) {
        item.onClick();
        onClose();
      } else if (item.hasSubmenu) {
        setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
      }
    } else {
      // On desktop, maintain original behavior
      if (!item.disabled && item.onClick && !item.hasSubmenu) {
        item.onClick();
        onClose();
      }
    }
  };

  const handleItemHover = (label: string, hasSubmenu?: boolean) => {
    // Only handle hover on non-touch devices
    if (!screenSize.isTouchDevice && hasSubmenu) {
      setActiveSubmenu(label);
    } else if (!screenSize.isTouchDevice) {
      setActiveSubmenu(null);
    }
  };

  const renderSubmenu = (submenuItems: any[], parentLabel: string) => (
    <div 
      className="absolute left-full top-0 bg-gray-300 border-2 border-gray-400 shadow-lg z-50"
      style={{ 
        borderStyle: 'outset',
        fontSize: screenSize.isMobile ? '14px' : '11px',
        fontFamily: '"MS Sans Serif", sans-serif',
        width: screenSize.isMobile ? '160px' : '144px'
      }}
    >
      {submenuItems.map((item, index) => {
        if (item.separator) {
          return <div key={index} className="h-px bg-gray-400 mx-1 my-1" />;
        }
        
        return (
          <div
            key={index}
            className={`px-3 text-xs cursor-pointer flex items-center space-x-2 ${
              item.disabled 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'hover:bg-blue-600 hover:text-white'
            }`}
            style={{
              minHeight: screenSize.isMobile ? '44px' : '24px',
              paddingTop: screenSize.isMobile ? '12px' : '4px',
              paddingBottom: screenSize.isMobile ? '12px' : '4px',
              touchAction: 'manipulation'
            }}
            onClick={() => {
              if (!item.disabled && item.onClick) {
                item.onClick();
                onClose();
              }
            }}
          >
            {item.icon && (
              <span className="text-center" style={{ width: screenSize.isMobile ? '20px' : '16px' }}>
                {item.icon}
              </span>
            )}
            <span className="flex-1">{item.label}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div 
      className="fixed bg-gray-300 border-2 border-gray-400 shadow-lg z-50"
      style={{ 
        left: position.x, 
        top: position.y,
        borderStyle: 'outset',
        fontSize: screenSize.isMobile ? '14px' : '11px',
        fontFamily: '"MS Sans Serif", sans-serif',
        minWidth: screenSize.isMobile ? '200px' : '144px',
        maxWidth: screenSize.isMobile ? '90vw' : 'auto'
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
            className={`px-3 text-xs cursor-pointer flex items-center space-x-2 relative group ${
              item.disabled 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'hover:bg-blue-600 hover:text-white'
            } ${screenSize.isTouchDevice ? 'active:bg-blue-700' : ''}`}
            style={{
              minHeight: screenSize.isMobile ? '48px' : '24px',
              paddingTop: screenSize.isMobile ? '12px' : '4px',
              paddingBottom: screenSize.isMobile ? '12px' : '4px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '11px'
            }}
            onMouseEnter={() => handleItemHover(item.label || '', item.hasSubmenu)}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && (
              <span className="text-center" style={{ width: screenSize.isMobile ? '24px' : '16px' }}>
                {item.icon}
              </span>
            )}
            <span className="flex-1">{item.label}</span>
            {item.hasSubmenu && (
              <>
                <ChevronRight size={screenSize.isMobile ? 14 : 8} className="ml-1" />
                {activeSubmenu === item.label && item.submenu && (
                  <div className={screenSize.isTouchDevice ? 'block' : 'group-hover:block'}>
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
