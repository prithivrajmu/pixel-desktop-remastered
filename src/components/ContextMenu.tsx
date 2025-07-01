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

  // Calculate adjusted position to keep menu within screen bounds
  const menuWidth = screenSize.isMobile ? 200 : 144;
  const menuHeight = items.length * (screenSize.isMobile ? 48 : 24) + 8; // Approximate height
  
  let adjustedX = position.x;
  let adjustedY = position.y;
  
  // Adjust horizontal position
  if (adjustedX + menuWidth > screenSize.width) {
    adjustedX = screenSize.width - menuWidth - 10;
  }
  if (adjustedX < 10) {
    adjustedX = 10;
  }
  
  // Adjust vertical position  
  if (adjustedY + menuHeight > screenSize.height) {
    adjustedY = screenSize.height - menuHeight - 10;
  }
  if (adjustedY < 10) {
    adjustedY = 10;
  }

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

  const renderSubmenu = (submenuItems: any[], parentLabel: string) => {
    // Calculate submenu position
    const submenuWidth = screenSize.isMobile ? 160 : 144;
    let submenuLeft = '100%';
    
    // If submenu would go off-screen, show it on the left instead
    if (adjustedX + menuWidth + submenuWidth > screenSize.width) {
      submenuLeft = '-100%';
    }
    
    return (
      <div 
        className="absolute top-0 bg-gray-300 border-2 border-gray-400 shadow-lg z-50"
        style={{ 
          left: submenuLeft,
          borderStyle: 'outset',
          fontSize: screenSize.isMobile ? '14px' : '11px',
          fontFamily: '"MS Sans Serif", sans-serif',
          width: submenuWidth
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
  };

  return (
    <div 
      className="fixed bg-gray-300 border-2 border-gray-400 shadow-lg z-50"
      style={{ 
        left: adjustedX, 
        top: adjustedY,
        borderStyle: 'outset',
        fontSize: screenSize.isMobile ? '14px' : '11px',
        fontFamily: '"MS Sans Serif", sans-serif',
        minWidth: menuWidth,
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
