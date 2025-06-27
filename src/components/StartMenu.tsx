import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useGlobalDialog } from '../hooks/useGlobalDialog';

interface StartMenuProps {
  onShutdown: () => void;
}

interface MenuItem {
  label?: string;
  icon?: string; // icon path
  hasSubmenu?: boolean;
  type?: 'separator';
  submenu?: MenuItem[];
  action?: () => void;
  url?: string;
}

// Helper to render .ico icons
const IconImg = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} width={22} height={22} style={{ imageRendering: 'pixelated' }} />
);

export const StartMenu: React.FC<StartMenuProps> = ({ onShutdown }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const submenuHoverRef = useRef(false);
  const parentHoverRef = useRef(false);
  const menuRootRef = useRef<HTMLDivElement>(null);
  const { activeDialog, closeDialog } = useGlobalDialog();

  // Global click listener to close menu if click is outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRootRef.current &&
        !menuRootRef.current.contains(event.target as Node)
      ) {
        closeDialog();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDialog]);

  const clearSubmenuTimeout = () => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
  };

  const openSubmenu = (label: string) => {
    clearSubmenuTimeout();
    setActiveSubmenu(label);
  };

  const closeSubmenu = () => {
    clearSubmenuTimeout();
    setSubmenuTimeout(setTimeout(() => {
      if (!submenuHoverRef.current && !parentHoverRef.current) {
        setActiveSubmenu(null);
      }
    }, 500));
  };

  const handleParentEnter = (label: string, hasSubmenu?: boolean) => {
    parentHoverRef.current = true;
    if (hasSubmenu) {
      openSubmenu(label);
    } else {
      setActiveSubmenu(null);
    }
  };

  const handleParentLeave = () => {
    parentHoverRef.current = false;
    closeSubmenu();
  };

  const handleSubmenuEnter = () => {
    submenuHoverRef.current = true;
    clearSubmenuTimeout();
  };

  const handleSubmenuLeave = () => {
    submenuHoverRef.current = false;
    closeSubmenu();
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
    closeDialog();
  };

  // Map menu items to .ico files in public/icons
  const menuItems: MenuItem[] = [
    {
      label: 'Programs',
      icon: '/icons/Program Folder (16x16px & 24x24px).ico',
      hasSubmenu: true,
      submenu: [
        { label: 'Accessories', icon: '/icons/Folder catalog 2.ico', hasSubmenu: true, submenu: [
          { label: 'Calculator', icon: '/icons/Calculator.ico' },
          { label: 'Paint', icon: '/icons/Beizer.ico' },
          { label: 'Notepad', icon: '/icons/Notepad sheets.ico' },
          { label: 'WordPad', icon: '/icons/Blank sheet.ico' },
        ]},
        { label: 'StartUp', icon: '/icons/Arrow (up).ico' },
        { label: 'MS-DOS Prompt', icon: '/icons/MS-DOS logo.ico' },
        { label: 'Windows Explorer', icon: '/icons/Computer with programs.ico' },
        { type: 'separator' },
        { label: 'Portfolio Source Code', icon: '/icons/Generic.ico', action: () => handleExternalLink('https://github.com/yourusername/portfolio') },
      ]
    },
    {
      label: 'Documents',
      icon: '/icons/Documents Folder.ico',
      hasSubmenu: true,
      submenu: [
        { label: 'My Documents', icon: '/icons/Book.ico' },
        { label: 'Resume.pdf', icon: '/icons/Blank sheet.ico', action: () => handleExternalLink('/resume.pdf') },
      ]
    },
    {
      label: 'Settings',
      icon: '/icons/Settings.ico',
      hasSubmenu: true,
      submenu: [
        { label: 'Control Panel', icon: '/icons/Controls Folder.ico' },
        { label: 'Printers', icon: '/icons/Printer 2.ico' },
        { label: 'Taskbar...', icon: '/icons/Controls.ico' },
      ]
    },
    {
      label: 'Find',
      icon: '/icons/Search in sheet (16x16px & 32x32px) (blue).ico',
      hasSubmenu: true,
      submenu: [
        { label: 'Files or Folders...', icon: '/icons/Search on Diskette Drive (2 of 4).ico' },
        { label: 'Computer...', icon: '/icons/Computer Card.ico' },
      ]
    },
    { label: 'Help', icon: '/icons/Help book.ico' },
    { label: 'Run...', icon: '/icons/Program wait.ico' },
    { type: 'separator' },
    { label: 'Shut Down...', icon: '/icons/Turn Off Computer (display only).ico', action: onShutdown },
  ];

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.url) {
      handleExternalLink(item.url);
    }
    if (!item.hasSubmenu) {
      closeDialog();
    }
  };

  const renderSubmenu = (items: MenuItem[], level: number = 0) => (
    <div
      className="absolute left-full top-0 w-48 bg-gray-300 border-2 border-gray-500 shadow-lg z-50"
      style={{ borderStyle: 'outset' }}
      onMouseEnter={handleSubmenuEnter}
      onMouseLeave={handleSubmenuLeave}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return <div key={index} className="h-px bg-gray-500 mx-2 my-1" />;
        }
        return (
          <div
            key={index}
            className="flex items-center px-3 py-1 cursor-pointer text-sm relative group text-black hover:bg-blue-600 hover:text-white"
            onMouseEnter={() => handleParentEnter(item.label || '', item.hasSubmenu)}
            onMouseLeave={handleParentLeave}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleItemClick(item);
            }}
          >
            <span className="w-6 text-center mr-3">
              {item.icon && <IconImg src={item.icon} alt={item.label || ''} />}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.hasSubmenu && (
              <>
                <ChevronRight size={10} className="ml-2" />
                {activeSubmenu === item.label && item.submenu && (
                  <div className="absolute top-0 left-full z-50">
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
      ref={menuRootRef}
      className="absolute bottom-0 left-0 flex bg-gray-300 border-2 border-gray-500 shadow-xl z-40"
      style={{ borderStyle: 'outset', minWidth: 270 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Vertical Windows95 label */}
      <div
        className="flex flex-col items-center justify-center bg-gray-200 border-r-2 border-gray-500 select-none"
        style={{
          width: 44,
          borderStyle: 'outset',
          fontFamily: 'MS Sans Serif, sans-serif',
          position: 'relative',
          minHeight: 270,
        }}
      >
        <span
          className="text-gray-700 font-bold tracking-widest"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontSize: '18px',
            letterSpacing: '2px',
            userSelect: 'none',
            margin: 0,
            padding: 0,
            lineHeight: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(180deg)',
            whiteSpace: 'nowrap',
          }}
        >
          Windows95
        </span>
      </div>
      {/* Menu Items */}
      <div 
        className="py-1 relative flex-1" 
        style={{ minWidth: 210, fontFamily: 'MS Sans Serif, sans-serif' }}
      >
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
              onMouseEnter={() => handleParentEnter(item.label || '', item.hasSubmenu)}
              onMouseLeave={handleParentLeave}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleItemClick(item);
              }}
              style={{ fontSize: '14px', minHeight: 28 }}
            >
              <span className="w-7 flex items-center justify-center mr-3">
                {item.icon && <IconImg src={item.icon} alt={item.label || ''} />}
              </span>
              <span className="flex-1 text-left" style={{ paddingLeft: 2 }}>{item.label}</span>
              {item.hasSubmenu && <ChevronRight size={13} className="ml-2" />}
              {activeSubmenu === item.label && item.submenu && (
                <div className="absolute top-0 left-full z-50">
                  {renderSubmenu(item.submenu, 1)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
