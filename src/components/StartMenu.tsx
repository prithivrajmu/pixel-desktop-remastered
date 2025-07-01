import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useGlobalDialog } from '../hooks/useGlobalDialog';
import { useSounds } from './SoundManager';
import { useScreenSize } from '../hooks/use-mobile';

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
  const [activeNestedSubmenu, setActiveNestedSubmenu] = useState<string | null>(null);
  const [activeMobileNestedSubmenu, setActiveMobileNestedSubmenu] = useState<string | null>(null);
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const submenuHoverRef = useRef(false);
  const nestedSubmenuHoverRef = useRef(false);
  const parentHoverRef = useRef(false);
  const menuRootRef = useRef<HTMLDivElement>(null);
  const { activeDialog, closeDialog } = useGlobalDialog();
  const sounds = useSounds();
  const screenSize = useScreenSize();

  // Debug: Log screen size information
  console.log('🖥️ StartMenu Debug - Screen Info:', {
    width: screenSize.width,
    height: screenSize.height,
    isMobile: screenSize.isMobile,
    isLandscape: screenSize.isLandscape,
    isTouchDevice: screenSize.isTouchDevice
  });

  // Calculate responsive styles
  const menuStyles = {
    width: screenSize.isMobile ? 
      (screenSize.isLandscape ? '60vw' : 'min(85vw, 280px)') : 
      'auto',
    minWidth: screenSize.isMobile ? 
      (screenSize.isLandscape ? '200px' : '250px') : 
      'auto',
    maxWidth: screenSize.isMobile ? 
      (screenSize.isLandscape ? '320px' : '300px') : 
      'auto',
    maxHeight: screenSize.isMobile ? 
      (screenSize.isLandscape ? '85vh' : '75vh') : 
      'auto',
  };

  // Debug: Log calculated menu styles
  console.log('📐 StartMenu Debug - Calculated Styles:', menuStyles);

  // Debug: Log mobile-specific conditions
  if (screenSize.isMobile) {
    console.log('📱 StartMenu Debug - Mobile Portrait Mode:', {
      isPortrait: !screenSize.isLandscape,
      shouldHideVerticalLabel: screenSize.isMobile,
      calculatedWidth: menuStyles.width,
      calculatedMaxHeight: menuStyles.maxHeight
    });
  }

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
    sounds.playMenuOpen();
  };

  const closeSubmenu = () => {
    clearSubmenuTimeout();
    setSubmenuTimeout(setTimeout(() => {
      if (!submenuHoverRef.current && !parentHoverRef.current && !nestedSubmenuHoverRef.current) {
        setActiveSubmenu(null);
        setActiveNestedSubmenu(null);
      }
    }, 1000));
  };

  const handleParentEnter = (label: string, hasSubmenu?: boolean) => {
    parentHoverRef.current = true;
    clearSubmenuTimeout(); // Clear any pending timeout
    if (hasSubmenu) {
      openSubmenu(label);
      // Clear nested submenu when switching main menu items
      setActiveNestedSubmenu(null);
    } else {
      setActiveSubmenu(null);
      setActiveNestedSubmenu(null);
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

  const handleSubmenuItemEnter = (label: string, hasSubmenu?: boolean) => {
    // Keep the submenu open when hovering over submenu items
    submenuHoverRef.current = true;
    clearSubmenuTimeout();
    if (hasSubmenu) {
      // For nested submenus, use separate state
      setActiveNestedSubmenu(label);
    } else {
      // Clear nested submenu if hovering over non-submenu item
      setActiveNestedSubmenu(null);
    }
  };

  const handleNestedSubmenuEnter = () => {
    nestedSubmenuHoverRef.current = true;
    clearSubmenuTimeout();
  };

  const handleNestedSubmenuLeave = () => {
    nestedSubmenuHoverRef.current = false;
    closeSubmenu();
  };

  const handleNestedSubmenuItemEnter = () => {
    // Keep the nested submenu open when hovering over nested items
    nestedSubmenuHoverRef.current = true;
    clearSubmenuTimeout();
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
        { label: 'Portfolio Source Code', icon: '/icons/Generic.ico', action: () => handleExternalLink('https://github.com/prithivrajmu/pixel-desktop-remastered') },
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
    sounds.playMenuSelect();
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
            onMouseEnter={() => handleSubmenuItemEnter(item.label || '', item.hasSubmenu)}
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
                {activeNestedSubmenu === item.label && item.submenu && (
                  <div className="absolute top-0 left-full z-50">
                    <div
                      className="absolute left-full top-0 w-48 bg-gray-300 border-2 border-gray-500 shadow-lg z-50"
                      style={{ borderStyle: 'outset' }}
                      onMouseEnter={handleNestedSubmenuEnter}
                      onMouseLeave={handleNestedSubmenuLeave}
                    >
                      {item.submenu.map((nestedItem, nestedIndex) => {
                        if (nestedItem.type === 'separator') {
                          return <div key={nestedIndex} className="h-px bg-gray-500 mx-2 my-1" />;
                        }
                        return (
                                                     <div
                             key={nestedIndex}
                             className="flex items-center px-3 py-1 cursor-pointer text-sm relative group text-black hover:bg-blue-600 hover:text-white"
                             onMouseEnter={handleNestedSubmenuItemEnter}
                             onMouseDown={(e) => {
                               e.preventDefault();
                               e.stopPropagation();
                               handleItemClick(nestedItem);
                             }}
                           >
                            <span className="w-6 text-center mr-3">
                              {nestedItem.icon && <IconImg src={nestedItem.icon} alt={nestedItem.label || ''} />}
                            </span>
                            <span className="flex-1">{nestedItem.label}</span>
                          </div>
                        );
                      })}
                    </div>
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
      className={`absolute bottom-0 left-0 flex bg-gray-300 border-2 border-gray-500 shadow-xl z-40 ${
        screenSize.isMobile ? 'h-auto max-h-[85vh]' : ''
      }`}
      style={{ 
        borderStyle: 'outset', 
        width: menuStyles.width,
        minWidth: menuStyles.minWidth,
        maxWidth: menuStyles.maxWidth,
        maxHeight: menuStyles.maxHeight,
        overflow: screenSize.isMobile ? 'hidden' : 'visible',
        bottom: screenSize.isMobile ? '48px' : '28px', // Account for taskbar height
        position: 'fixed',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Vertical Windows95 label - Hidden on mobile for space */}
      <div
        className={`flex flex-col items-center justify-center bg-gray-200 border-r-2 border-gray-500 select-none ${
          screenSize.isMobile ? 'hidden' : ''
        }`}
        style={{
          width: 44,
          borderStyle: 'outset',
          fontFamily: 'MS Sans Serif, sans-serif',
          position: 'relative',
          minHeight: 'auto',
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
          Windows 95
        </span>
      </div>
      
      {/* Menu Items */}
      <div 
        className={`py-1 relative flex-1 ${screenSize.isMobile ? 'overflow-y-auto' : ''}`}
        style={{ 
          minWidth: screenSize.isMobile ? 'auto' : 210, 
          fontFamily: 'MS Sans Serif, sans-serif',
          WebkitOverflowScrolling: 'touch',
          maxHeight: screenSize.isMobile ? 'calc(85vh - 2px)' : 'auto'
        }}
      >
        {menuItems.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={index} className={`bg-gray-500 mx-2 my-1 ${
                screenSize.isMobile ? 'h-0.5' : 'h-px'
              }`} />
            );
          }
          return (
            <div
              key={index}
              className={`flex items-center px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer group relative ${
                screenSize.isTouchDevice ? 'active:bg-blue-700' : ''
              } ${screenSize.isMobile ? 'border-b border-gray-400' : ''}`}
              onMouseEnter={() => !screenSize.isMobile && handleParentEnter(item.label || '', item.hasSubmenu)}
              onMouseLeave={() => !screenSize.isMobile && handleParentLeave()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔄 StartMenu Debug - Item clicked:', {
                  itemLabel: item.label,
                  hasSubmenu: item.hasSubmenu,
                  isMobile: screenSize.isMobile,
                  currentActiveSubmenu: activeSubmenu
                });
                
                if (screenSize.isMobile && item.hasSubmenu) {
                  // On mobile, toggle submenu on click instead of hover
                  if (activeSubmenu === item.label) {
                    console.log('🚫 StartMenu Debug - Closing submenu:', item.label);
                    setActiveSubmenu(null);
                  } else {
                    console.log('✅ StartMenu Debug - Opening submenu:', item.label);
                    setActiveSubmenu(item.label || '');
                  }
                } else {
                  handleItemClick(item);
                }
              }}
              onMouseDown={(e) => {
                if (!screenSize.isMobile) {
                  e.preventDefault();
                  e.stopPropagation();
                  handleItemClick(item);
                }
              }}
              style={{ 
                fontSize: screenSize.isMobile ? '14px' : '14px', 
                minHeight: screenSize.isMobile ? 40 : 28,
                touchAction: 'manipulation',
                paddingLeft: screenSize.isMobile ? '16px' : '12px',
                paddingRight: screenSize.isMobile ? '16px' : '12px'
              }}
            >
              <span className={`flex items-center justify-center mr-3 ${
                screenSize.isMobile ? 'w-8' : 'w-7'
              }`}>
                {item.icon && <IconImg src={item.icon} alt={item.label || ''} />}
              </span>
              <span className="flex-1 text-left" style={{ paddingLeft: 2 }}>{item.label}</span>
              {item.hasSubmenu && (
                <ChevronRight 
                  size={screenSize.isMobile ? 16 : 13} 
                  className={`ml-2 ${activeSubmenu === item.label && screenSize.isMobile ? 'rotate-90' : ''}`} 
                  style={{ 
                    transition: 'transform 0.2s ease',
                    color: activeSubmenu === item.label && screenSize.isMobile ? '#0066cc' : 'inherit'
                  }}
                />
              )}
              
              {/* Submenu rendering */}
              {activeSubmenu === item.label && item.submenu && (() => {
                // Debug logging
                console.log('🎯 StartMenu Debug - Rendering submenu for:', {
                  itemLabel: item.label,
                  isMobile: screenSize.isMobile,
                  submenuItemCount: item.submenu?.length,
                  activeSubmenu: activeSubmenu
                });
                if (screenSize.isMobile) {
                  console.log('📱 StartMenu Debug - Rendering MOBILE submenu');
                }
                
                return (
                  <div className={`absolute z-50 ${
                    screenSize.isMobile 
                      ? 'top-full left-0 right-0 bg-gray-200 border-t border-gray-400' 
                      : 'top-0 left-full'
                  }`}>
                    {screenSize.isMobile ? (
                      <div className="bg-gray-200 max-h-64 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {item.submenu.map((subItem, subIndex) => {
                          if (subItem.type === 'separator') {
                            return <div key={subIndex} className="h-0.5 bg-gray-500 mx-4 my-1" />;
                          }
                          return (
                            <React.Fragment key={subIndex}>
                              <div
                                className={`flex items-center px-6 py-3 cursor-pointer text-base text-black hover:bg-blue-600 hover:text-white active:bg-blue-700 border-b border-gray-300 ${subItem.hasSubmenu ? 'justify-between' : ''}`}
                                style={{ 
                                  touchAction: 'manipulation', 
                                  minHeight: 40,
                                  fontSize: '14px'
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (subItem.hasSubmenu) {
                                    // Toggle nested submenu level on mobile
                                    if (activeMobileNestedSubmenu === subItem.label) {
                                      setActiveMobileNestedSubmenu(null);
                                    } else {
                                      setActiveMobileNestedSubmenu(subItem.label || null);
                                    }
                                  } else {
                                    handleItemClick(subItem);
                                  }
                                }}
                              >
                                <span className="w-8 flex items-center justify-center mr-3">
                                  {subItem.icon && <IconImg src={subItem.icon} alt={subItem.label || ''} />}
                                </span>
                                <span className="flex-1">{subItem.label}</span>
                                {subItem.hasSubmenu && (
                                  <ChevronRight 
                                    size={14}
                                    className={`transition-transform ${activeMobileNestedSubmenu === subItem.label ? 'rotate-90 text-[#0066cc]' : ''}`}
                                  />
                                )}
                              </div>

                              {/* Nested submenu for mobile */}
                              {subItem.hasSubmenu && activeMobileNestedSubmenu === subItem.label && subItem.submenu && (
                                <div className="bg-gray-100 border-t border-gray-400 max-h-64 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                                  {subItem.submenu.map((nestedItem, nestedIdx) => {
                                    if (nestedItem.type === 'separator') {
                                      return <div key={nestedIdx} className="h-0.5 bg-gray-500 mx-8 my-1" />;
                                    }
                                    return (
                                      <div
                                        key={nestedIdx}
                                        className="flex items-center px-10 py-3 cursor-pointer text-base text-black hover:bg-blue-600 hover:text-white active:bg-blue-700 border-b border-gray-300"
                                        style={{ touchAction: 'manipulation', minHeight: 40, fontSize: '14px' }}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleItemClick(nestedItem);
                                          setActiveMobileNestedSubmenu(null);
                                          setActiveSubmenu(null);
                                        }}
                                      >
                                        <span className="w-8 flex items-center justify-center mr-3">
                                          {nestedItem.icon && <IconImg src={nestedItem.icon} alt={nestedItem.label || ''} />}
                                        </span>
                                        <span className="flex-1">{nestedItem.label}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    ) : (
                      renderSubmenu(item.submenu, 1)
                    )}
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
};
