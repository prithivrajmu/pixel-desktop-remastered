
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
  onShutdown: () => void;
}

interface MenuItem {
  label?: string;
  icon?: string;
  hasSubmenu?: boolean;
  type?: 'separator';
  submenu?: MenuItem[];
  action?: () => void;
  url?: string;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onClose, onShutdown }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
    onClose();
  };

  const menuItems: MenuItem[] = [
    { 
      label: 'Programs', 
      icon: '📁', 
      hasSubmenu: true,
      submenu: [
        { 
          label: 'Accessories', 
          icon: '📁', 
          hasSubmenu: true,
          submenu: [
            { label: 'Calculator', icon: '🧮' },
            { label: 'Paint', icon: '🎨' },
            { label: 'Notepad', icon: '📝' },
            { label: 'WordPad', icon: '📄' },
          ]
        },
        { 
          label: 'StartUp', 
          icon: '▶️', 
        },
        { 
          label: 'MS-DOS Prompt', 
          icon: '💻', 
        },
        { 
          label: 'Windows Explorer', 
          icon: '📁', 
        },
        { type: 'separator' },
        { 
          label: 'Portfolio Source Code', 
          icon: '💻', 
          action: () => handleExternalLink('https://github.com/yourusername/portfolio')
        },
      ]
    },
    { 
      label: 'Documents', 
      icon: '📄', 
      hasSubmenu: true,
      submenu: [
        { label: 'My Documents', icon: '📁' },
        { 
          label: 'Resume.pdf', 
          icon: '📄', 
          action: () => handleExternalLink('/resume.pdf')
        },
      ]
    },
    { 
      label: 'Settings', 
      icon: '⚙️', 
      hasSubmenu: true,
      submenu: [
        { label: 'Control Panel', icon: '⚙️' },
        { label: 'Printers', icon: '🖨️' },
        { label: 'Taskbar...', icon: '📊' },
      ]
    },
    { 
      label: 'Find', 
      icon: '🔍', 
      hasSubmenu: true,
      submenu: [
        { label: 'Files or Folders...', icon: '🔍' },
        { label: 'Computer...', icon: '💻' },
      ]
    },
    { label: 'Help', icon: '❓' },
    { label: 'Run...', icon: '▶️' },
    { type: 'separator' },
    { 
      label: 'Shut Down...', 
      icon: '⏻', 
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
    } else if (item.url) {
      handleExternalLink(item.url);
    }
    if (!item.hasSubmenu) {
      onClose();
    }
  };

  const renderSubmenu = (items: MenuItem[], level: number = 0) => (
    <div 
      className="absolute left-full top-0 w-48 bg-gray-300 border-2 border-gray-500 shadow-lg z-50"
      style={{ borderStyle: 'outset' }}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return <div key={index} className="h-px bg-gray-500 mx-2 my-1" />;
        }

        return (
          <div
            key={index}
            className="flex items-center px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-sm relative group"
            onMouseEnter={() => handleItemHover(item.label || '', item.hasSubmenu)}
            onClick={() => handleItemClick(item)}
          >
            <span className="w-6 text-center mr-3">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.hasSubmenu && (
              <>
                <ChevronRight size={10} className="ml-2" />
                {activeSubmenu === item.label && item.submenu && (
                  <div className="group-hover:block">
                    {renderSubmenu(item.submenu, level + 1)}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div 
      className="absolute bottom-10 left-0 w-64 bg-gray-300 border-2 border-gray-500 shadow-xl z-40"
      style={{ borderStyle: 'outset' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Start Menu Header */}
      <div 
        className="bg-gradient-to-r from-gray-400 to-gray-500 text-black px-4 py-2 border-b border-gray-500"
        style={{
          background: 'linear-gradient(90deg, #c0c0c0 0%, #808080 100%)',
          fontSize: '11px',
          fontWeight: 'bold'
        }}
      >
        <div className="flex items-center space-x-2">
          <span>Windows</span>
          <span style={{ fontSize: '10px', fontWeight: 'normal' }}>95</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1 relative">
        {menuItems.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={index} className="h-px bg-gray-500 mx-2 my-1" />
            );
          }

          return (
            <div
              key={index}
              className="flex items-center px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer group relative"
              onMouseEnter={() => handleItemHover(item.label || '', item.hasSubmenu)}
              onClick={() => handleItemClick(item)}
              style={{ fontSize: '11px' }}
            >
              <span className="w-6 text-center mr-3">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.hasSubmenu && (
                <>
                  <ChevronRight size={8} className="ml-2" />
                  {activeSubmenu === item.label && item.submenu && (
                    <div className="group-hover:block">
                      {renderSubmenu(item.submenu)}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
