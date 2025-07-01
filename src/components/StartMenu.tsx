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
const IconImg = ({ src, alt, isMobilePortrait }: { src: string; alt: string; isMobilePortrait?: boolean }) => (
  <img 
    src={src} 
    alt={alt} 
    width={isMobilePortrait ? 14 : 22} 
    height={isMobilePortrait ? 14 : 22} 
    style={{ imageRendering: 'pixelated' }} 
  />
);

export const StartMenu: React.FC<StartMenuProps> = ({ onShutdown }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeNestedSubmenu, setActiveNestedSubmenu] = useState<string | null>(null);
  
  // Mobile sliding menu state - only used on mobile
  const [mobileMenuStack, setMobileMenuStack] = useState<Array<{
    items: MenuItem[];
    title: string;
    parentLabel?: string;
  }>>([]);
  const [slideDirection, setSlideDirection] = useState<'slide-in' | 'slide-out'>('slide-in');
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const submenuHoverRef = useRef(false);
  const nestedSubmenuHoverRef = useRef(false);
  const parentHoverRef = useRef(false);
  const menuRootRef = useRef<HTMLDivElement>(null);
  const { activeDialog, closeDialog } = useGlobalDialog();
  const sounds = useSounds();
  const screenSize = useScreenSize();

  // NEW: Accordion state for mobile portrait view
  const [accordionPath, setAccordionPath] = useState<string[]>([]);

  // Calculate responsive styles - simplified to just two modes
  const isMobilePortrait = screenSize.isMobile && !screenSize.isLandscape;
  const useAccordionStyle = isMobilePortrait; // Only mobile portrait uses accordion
  const useUnifiedStyle = !isMobilePortrait; // Everything else uses unified click-based style
  
  const menuStyles = {
    width: isMobilePortrait ? 'min(65vw, 200px)' : 
      screenSize.isMobile ? '60vw' : 
      screenSize.isTablet ? 'auto' : 'auto',
    minWidth: isMobilePortrait ? '160px' : 
      screenSize.isMobile ? '200px' : 
      screenSize.isTablet ? '220px' : 'auto',
    maxWidth: isMobilePortrait ? '200px' : 
      screenSize.isMobile ? '320px' : 
      screenSize.isTablet ? '280px' : 'auto',
    maxHeight: isMobilePortrait ? '60vh' : 
      screenSize.isMobile ? '80vh' : 
      screenSize.isTablet ? '75vh' : 'auto',
  };

  // Global click listener to close menu if click is outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRootRef.current &&
        !menuRootRef.current.contains(event.target as Node)
      ) {
        resetMobileMenuStack(); // Reset mobile menu state
        closeDialog();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDialog]);

  // Reset mobile menu stack when dialog state changes
  useEffect(() => {
    if (!activeDialog) {
      resetMobileMenuStack();
    }
  }, [activeDialog]);

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

  // Mobile sliding navigation functions
  const navigateToMobileSubmenu = (items: MenuItem[], title: string, parentLabel?: string) => {
    setSlideDirection('slide-in');
    setMobileMenuStack(prev => [...prev, { items, title, parentLabel }]);
    sounds.playMenuOpen();
  };

  const navigateBackMobile = () => {
    if (mobileMenuStack.length === 1) {
      // Going back to main menu
      setSlideDirection('slide-out');
      setTimeout(() => {
        resetMobileMenuStack();
      }, 300);
    } else {
      // Going back to previous submenu level
      setSlideDirection('slide-out');
      setTimeout(() => {
        setMobileMenuStack(prev => prev.slice(0, -1));
        setSlideDirection('slide-in');
      }, 300);
    }
  };

  const resetMobileMenuStack = () => {
    setMobileMenuStack([]);
    setActiveSubmenu(null);
    setActiveNestedSubmenu(null);
    // NEW: also reset accordion path when closing menu
    setAccordionPath([]);
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
        { label: 'Resume.pdf', icon: '/icons/Blank sheet.ico', action: () => {
          // Import and use the downloadResume function for better UX
          import('../utils/downloadUtils').then(({ downloadResume }) => {
            downloadResume();
            closeDialog();
          });
        }},
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

  // NEW: helper to toggle accordion paths on mobile portrait
  const handleToggleAccordion = (item: MenuItem, level: number) => {
    if (!isMobilePortrait) return;
    setAccordionPath(prev => {
      const newPath = prev.slice(0, level); // keep path till parent level
      if (prev[level] === item.label) {
        // collapse if already open
        return newPath;
      }
      return [...newPath, item.label || ''];
    });
    // play open sound when expanding
    if (item.hasSubmenu) {
      sounds.playMenuOpen();
    }
  };

  const renderSubmenu = (items: MenuItem[], level: number = 0) => (
    <div
      className="absolute left-full top-0 w-48 bg-gray-300 border-2 border-gray-500 shadow-lg z-50"
      style={{ borderStyle: 'outset' }}
      {...(useUnifiedStyle && !screenSize.isTouchDevice ? {
        onMouseEnter: handleSubmenuEnter,
        onMouseLeave: handleSubmenuLeave
      } : {})}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return <div key={index} className="h-px bg-gray-500 mx-2 my-1" />;
        }
        return (
          <div
            key={index}
            className="flex items-center px-3 py-1 cursor-pointer text-sm relative group text-black hover:bg-blue-600 hover:text-white"
            {...(useUnifiedStyle && !screenSize.isTouchDevice ? {
              onMouseEnter: () => handleSubmenuItemEnter(item.label || '', item.hasSubmenu)
            } : {})}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              
              // Handle nested submenus in unified style
              if (useUnifiedStyle && item.hasSubmenu && item.submenu) {
                // Toggle nested submenu for touch devices and unified style
                if (activeNestedSubmenu === item.label) {
                  setActiveNestedSubmenu(null);
                } else {
                  setActiveNestedSubmenu(item.label);
                }
              } else {
                handleItemClick(item);
              }
            }}
            {...(useUnifiedStyle && !screenSize.isTouchDevice ? {
              onMouseDown: (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleItemClick(item);
              }
            } : {})}
          >
            <span className={`flex items-center justify-center mr-3 ${
              isMobilePortrait ? 'w-5' : 'w-8'
            }`}>
              {item.icon && <IconImg src={item.icon} alt={item.label || ''} isMobilePortrait={isMobilePortrait} />}
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
                      {...(useUnifiedStyle && !screenSize.isTouchDevice ? {
                        onMouseEnter: handleNestedSubmenuEnter,
                        onMouseLeave: handleNestedSubmenuLeave
                      } : {})}
                    >
                      {item.submenu.map((nestedItem, nestedIndex) => {
                        if (nestedItem.type === 'separator') {
                          return <div key={nestedIndex} className={`bg-gray-500 mx-8 my-1 ${
                            isMobilePortrait ? 'h-px' : 'h-0.5'
                          }`} />;
                        }
                        return (
                          <div
                             key={nestedIndex}
                             className="flex items-center px-3 py-1 cursor-pointer text-sm relative group text-black hover:bg-blue-600 hover:text-white"
                             {...(useUnifiedStyle && !screenSize.isTouchDevice ? {
                               onMouseEnter: handleNestedSubmenuItemEnter
                             } : {})}
                             onClick={(e) => {
                               e.preventDefault();
                               e.stopPropagation();
                               handleItemClick(nestedItem);
                             }}
                             {...(useUnifiedStyle && !screenSize.isTouchDevice ? {
                               onMouseDown: (e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 handleItemClick(nestedItem);
                               }
                             } : {})}
                           >
                            <span className={`flex items-center justify-center mr-3 ${
                              isMobilePortrait ? 'w-5' : 'w-8'
                            }`}>
                              {nestedItem.icon && <IconImg src={nestedItem.icon} alt={nestedItem.label || ''} isMobilePortrait={isMobilePortrait} />}
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

  // NEW: Recursive renderer for accordion submenu (mobile portrait only)
  const renderAccordionSubmenu = (items: MenuItem[], level: number = 1): JSX.Element => (
    <>
      {items.map((subItem, subIndex) => {
        if (subItem.type === 'separator') {
          return <div key={`sep-${level}-${subIndex}`} className="h-px bg-gray-500 mx-2 my-1" />;
        }

        const isOpen = accordionPath[level] === subItem.label;
        const indent = (level + 1) * 18;

        return (
          <React.Fragment key={`${level}-${subIndex}-${subItem.label}`}> 
            <div
              className="flex items-center px-3 py-1 cursor-pointer text-black hover:bg-blue-600 hover:text-white active:bg-blue-700 border-b border-gray-400"
              style={{
                paddingLeft: indent,
                touchAction: 'manipulation',
                minHeight: 28,
                fontSize: '12px',
                WebkitTapHighlightColor: 'rgba(0, 102, 204, 0.3)',
                userSelect: 'none'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (subItem.hasSubmenu && subItem.submenu) {
                  handleToggleAccordion(subItem, level);
                } else {
                  handleItemClick(subItem);
                  // close menu after selection
                  closeDialog();
                }
              }}
            >
              <span className={`flex items-center justify-center mr-3 ${'w-5'}`}> 
                {subItem.icon && <IconImg src={subItem.icon} alt={subItem.label || ''} isMobilePortrait={true} />} 
              </span>
              <span className="flex-1 text-left" style={{ paddingLeft: 2 }}>{subItem.label}</span>
              {subItem.hasSubmenu && (
                <ChevronRight
                  size={10}
                  className={`ml-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                />
              )}
            </div>
            {subItem.hasSubmenu && isOpen && subItem.submenu && renderAccordionSubmenu(subItem.submenu, level + 1)}
          </React.Fragment>
        );
      })}
    </>
  );

  // Render mobile sliding submenu
  const renderMobileSlidingSubmenu = () => {
    if (!screenSize.isMobile || mobileMenuStack.length === 0) return null;
    
    const currentSubmenu = mobileMenuStack[mobileMenuStack.length - 1];
    
    return (
      <div 
        className={`absolute inset-0 bg-gray-200 z-50 transition-transform duration-300 ease-in-out ${
          slideDirection === 'slide-in' ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          borderStyle: 'outset',
          fontFamily: 'MS Sans Serif, sans-serif'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with back button */}
        <div className="flex items-center bg-gray-300 border-b-2 border-gray-500 px-3 py-2" style={{ borderStyle: 'outset' }}>
          <button
            className="flex items-center justify-center w-8 h-8 bg-gray-300 border border-gray-500 mr-3 hover:bg-gray-400 active:bg-gray-500"
            style={{ borderStyle: 'outset' }}
            onClick={navigateBackMobile}
          >
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>←</span>
          </button>
          <span className="flex-1 font-bold" style={{ fontSize: '14px' }}>{currentSubmenu.title}</span>
          <button
            className="flex items-center justify-center w-6 h-6 bg-gray-300 border border-gray-500 hover:bg-gray-400 active:bg-gray-500"
            style={{ borderStyle: 'outset', fontSize: '10px' }}
            onClick={resetMobileMenuStack}
          >
            ×
          </button>
        </div>
        
        {/* Submenu items */}
        <div className="overflow-y-auto" style={{ 
          maxHeight: isMobilePortrait ? 'calc(65vh - 60px)' : 'calc(80vh - 60px)',
          WebkitOverflowScrolling: 'touch'
        }}>
          {currentSubmenu.items.map((item, index) => {
            if (item.type === 'separator') {
              return <div key={index} className={`h-px bg-gray-500 mx-2 my-1`} />;
            }
            
            return (
              <div
                key={index}
                className="flex items-center px-3 py-1 cursor-pointer text-black hover:bg-blue-600 hover:text-white active:bg-blue-700 border-b border-gray-400"
                              style={{ 
                touchAction: 'manipulation',
                minHeight: isMobilePortrait ? 28 : screenSize.isMobile ? 40 : 28,
                fontSize: isMobilePortrait ? '12px' : screenSize.isMobile ? '14px' : '14px',
                paddingLeft: isMobilePortrait ? '10px' : screenSize.isMobile ? '16px' : '12px',
                paddingRight: isMobilePortrait ? '10px' : screenSize.isMobile ? '16px' : '12px',
                WebkitTapHighlightColor: 'rgba(0, 102, 204, 0.3)',
                userSelect: 'none'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Handle different device behaviors for mobile sliding submenu
                if (useAccordionStyle) {
                  // Mobile portrait: accordion style
                  if (item.hasSubmenu) {
                    handleToggleAccordion(item, 0);
                  } else {
                    handleItemClick(item);
                    closeDialog();
                  }
                } else if (useUnifiedStyle && item.hasSubmenu && item.submenu) {
                  // Non-mobile portrait: sliding interface for submenus on mobile, click-based for tablets
                  if (screenSize.isMobile) {
                    navigateToMobileSubmenu(item.submenu, item.label || 'Submenu');
                  } else {
                    // For tablets and desktop touch devices, toggle submenu visibility
                    if (activeSubmenu === item.label) {
                      setActiveSubmenu(null);
                    } else {
                      setActiveSubmenu(item.label);
                    }
                  }
                } else if (!item.hasSubmenu) {
                  // Regular item click for items without submenus (all devices)
                  handleItemClick(item);
                }
              }}
              >
                <span className={`flex items-center justify-center mr-3 ${
                  isMobilePortrait ? 'w-5' : screenSize.isMobile ? 'w-8' : 'w-7'
                }`}>
                  {item.icon && <IconImg src={item.icon} alt={item.label || ''} isMobilePortrait={isMobilePortrait} />}
                </span>
                <span className="flex-1" style={{ paddingLeft: 2 }}>{item.label}</span>
                {item.hasSubmenu && (
                  <ChevronRight 
                    size={isMobilePortrait ? 10 : screenSize.isMobile ? 16 : 13}
                    className="ml-2" 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={menuRootRef}
      className={`absolute bottom-0 left-0 flex bg-gray-300 border-2 border-gray-500 shadow-xl z-40 ${
        screenSize.isMobile ? 'h-auto max-h-[70vh]' : ''
      }`}
      style={{ 
        borderStyle: 'outset', 
        width: menuStyles.width,
        minWidth: menuStyles.minWidth,
        maxWidth: menuStyles.maxWidth,
        maxHeight: screenSize.isMobile ? 
          (isMobilePortrait ? 'calc(70vh - 2px)' : 'calc(85vh - 2px)') : 
          'none',
        overflowY: screenSize.isMobile ? 'visible' : 'visible',
        overflowX: 'visible',
        bottom: screenSize.isMobile ? '48px' : screenSize.isTablet ? '36px' : '28px', // Account for taskbar height
        position: 'fixed',
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
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
          maxHeight: screenSize.isMobile ? 
            (isMobilePortrait ? 'calc(68vh - 2px)' : 'calc(83vh - 2px)') : 
            'auto',
          overflowX: 'visible'
        }}
      >
        {menuItems.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div key={index} className={`bg-gray-500 mx-2 my-1 ${
                isMobilePortrait ? 'h-px' : screenSize.isMobile ? 'h-0.5' : 'h-px'
              }`} />
            );
          }
          
          // Determine if this root accordion is open (mobile portrait)
          const isRootOpen = isMobilePortrait && accordionPath[0] === item.label;

          return (
            <React.Fragment key={index}>
              <div
                className={`flex items-center px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer group relative ${
                  screenSize.isTouchDevice ? 'active:bg-blue-700 touch-manipulation' : ''
                } ${screenSize.isMobile ? 'border-b border-gray-400' : ''} ${
                  screenSize.isMobile ? 'transition-colors duration-150' : ''
                }`}
                {...(useUnifiedStyle && !screenSize.isTouchDevice ? {
                  onMouseEnter: () => handleParentEnter(item.label || '', item.hasSubmenu),
                  onMouseLeave: () => handleParentLeave()
                } : {})}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  // Handle different device behaviors for main menu
                  if (useAccordionStyle) {
                    // Mobile portrait: accordion style
                    if (item.hasSubmenu) {
                      handleToggleAccordion(item, 0);
                    } else {
                      handleItemClick(item);
                      closeDialog();
                    }
                  } else if (useUnifiedStyle && item.hasSubmenu && item.submenu) {
                    // Non-mobile portrait: sliding interface for submenus on mobile, click-based for tablets
                    if (screenSize.isMobile) {
                      navigateToMobileSubmenu(item.submenu, item.label || 'Submenu');
                    } else {
                      // For tablets and desktop touch devices, toggle submenu visibility
                      if (activeSubmenu === item.label) {
                        setActiveSubmenu(null);
                      } else {
                        setActiveSubmenu(item.label);
                      }
                    }
                  } else if (!item.hasSubmenu) {
                    // Regular item click for items without submenus (all devices)
                    handleItemClick(item);
                  }
                }}

                {...(useUnifiedStyle && !screenSize.isTouchDevice ? {
                  onMouseDown: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleItemClick(item);
                  }
                } : {})}
                style={{ 
                  fontSize: isMobilePortrait ? '12px' : screenSize.isMobile ? '14px' : '14px', 
                  minHeight: isMobilePortrait ? 28 : screenSize.isMobile ? 40 : 28,
                  touchAction: screenSize.isMobile ? 'manipulation' : 'auto',
                  paddingLeft: isMobilePortrait ? '10px' : screenSize.isMobile ? '16px' : '12px',
                  paddingRight: isMobilePortrait ? '10px' : screenSize.isMobile ? '16px' : '12px',
                  WebkitTapHighlightColor: screenSize.isMobile ? 'rgba(0, 102, 204, 0.3)' : 'transparent',
                  userSelect: 'none'
                }}
              >
                <span className={`flex items-center justify-center mr-3 ${
                  isMobilePortrait ? 'w-5' : screenSize.isMobile ? 'w-8' : 'w-7'
                }`}>
                  {item.icon && <IconImg src={item.icon} alt={item.label || ''} isMobilePortrait={isMobilePortrait} />}
                </span>
                <span className="flex-1 text-left" style={{ paddingLeft: 2 }}>{item.label}</span>
                {item.hasSubmenu && (
                  <ChevronRight 
                    size={isMobilePortrait ? 10 : screenSize.isMobile ? 16 : 13}
                    className={`ml-2 transition-transform ${isRootOpen ? 'rotate-90' : ''}`} 
                  />
                )}
                
                {/* Unified submenu rendering for non-mobile portrait */}
                {useUnifiedStyle && activeSubmenu === item.label && item.submenu && (
                  <div className="absolute top-0 left-full z-50">
                    {renderSubmenu(item.submenu, 1)}
                  </div>
                )}
              </div>

              {/* NEW: Accordion submenu rendering for mobile portrait */}
              {isRootOpen && item.submenu && (
                <div>
                  {renderAccordionSubmenu(item.submenu, 1)}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Mobile sliding submenu overlay - only render when in mobile */}
      {screenSize.isMobile && !isMobilePortrait && mobileMenuStack.length > 0 && renderMobileSlidingSubmenu()}
    </div>
  );
};
