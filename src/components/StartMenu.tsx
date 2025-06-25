
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
  onShutdown: () => void;
}

interface MenuItem {
  label: string;
  icon: string;
  hasSubmenu?: boolean;
  type?: 'separator';
  submenu?: MenuItem[];
  action?: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onClose, onShutdown }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { 
      label: 'Programs', 
      icon: '📁', 
      hasSubmenu: true,
      submenu: [
        { label: 'Accessories', icon: '📁', hasSubmenu: true },
        { label: 'Games', icon: '🎮', hasSubmenu: true },
        { label: 'Internet Tools', icon: '🌐', hasSubmenu: false },
        { label: 'Microsoft Office', icon: '📊', hasSubmenu: true },
      ]
    },
    { 
      label: 'Documents', 
      icon: '📄', 
      hasSubmenu: true,
      submenu: [
        { label: 'My Documents', icon: '📁', hasSubmenu: false },
        { label: 'Recent Documents', icon: '📄', hasSubmenu: false },
      ]
    },
    { label: 'Settings', icon: '⚙️', hasSubmenu: false },
    { 
      label: 'Find', 
      icon: '🔍', 
      hasSubmenu: true,
      submenu: [
        { label: 'Files or Folders...', icon: '📁', hasSubmenu: false },
        { label: 'Computer...', icon: '💻', hasSubmenu: false },
      ]
    },
    { label: 'Help', icon: '❓', hasSubmenu: false },
    { label: 'Run...', icon: '▶️', hasSubmenu: false },
    { type: 'separator' },
    { 
      label: 'Shut Down...', 
      icon: '⏻', 
      hasSubmenu: false,
      action: onShutdown
    },
  ];

  const handleItemHover = (label: string, hasSubmenu?: boolean) => {
    if (hasSubmenu) {
      setActiveSubmenu(label);
    } else {
      setActiveSubmenu(null);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    }
    if (!item.hasSubmenu) {
      onClose();
    }
  };

  return (
    <div 
      className="absolute bottom-10 left-0 w-64 bg-gray-300 border-2 border-gray-400 shadow-lg z-40"
      style={{ borderStyle: 'outset' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Start Menu Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3 flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-blue-600 font-bold">👤</span>
        </div>
        <div>
          <div className="font-bold text-sm">Windows 95</div>
          <div className="text-xs opacity-90">Portfolio Edition</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2 relative">
        {menuItems.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={index} className="h-px bg-gray-400 mx-2 my-1" />
            );
          }

          return (
            <div
              key={index}
              className="flex items-center px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer group relative"
              onMouseEnter={() => handleItemHover(item.label, item.hasSubmenu)}
              onClick={() => handleItemClick(item)}
            >
              <span className="w-6 text-center mr-3">{item.icon}</span>
              <span className="flex-1 text-sm">{item.label}</span>
              {item.hasSubmenu && (
                <ChevronRight size={12} className="ml-2" />
              )}

              {/* Submenu */}
              {item.hasSubmenu && activeSubmenu === item.label && item.submenu && (
                <div 
                  className="absolute left-full top-0 w-48 bg-gray-300 border-2 border-gray-400 shadow-lg"
                  style={{ borderStyle: 'outset' }}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm"
                      onClick={() => handleItemClick(subItem)}
                    >
                      <span className="w-6 text-center mr-3">{subItem.icon}</span>
                      <span className="flex-1">{subItem.label}</span>
                      {subItem.hasSubmenu && (
                        <ChevronRight size={10} className="ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
