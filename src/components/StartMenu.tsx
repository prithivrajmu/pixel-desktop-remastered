
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const menuItems = [
    { label: 'Programs', icon: '📁', hasSubmenu: true },
    { label: 'Documents', icon: '📄', hasSubmenu: true },
    { label: 'Settings', icon: '⚙️', hasSubmenu: false },
    { label: 'Find', icon: '🔍', hasSubmenu: true },
    { label: 'Help', icon: '❓', hasSubmenu: false },
    { label: 'Run...', icon: '▶️', hasSubmenu: false },
    { type: 'separator' },
    { label: 'Shut Down...', icon: '⏻', hasSubmenu: false },
  ];

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
      <div className="py-2">
        {menuItems.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={index} className="h-px bg-gray-400 mx-2 my-1" />
            );
          }

          return (
            <div
              key={index}
              className="flex items-center px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer group"
            >
              <span className="w-6 text-center mr-3">{item.icon}</span>
              <span className="flex-1 text-sm">{item.label}</span>
              {item.hasSubmenu && (
                <ChevronRight size={12} className="ml-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
