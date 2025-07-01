import React from 'react';
import { 
  MyComputer, 
  MyDocuments, 
  InternetExplorer, 
  RecycleBin, 
  Welcome, 
  Contact 
} from '../components/LazyComponents';

// Function to calculate responsive icon positions
export const getResponsiveIconPositions = (screenSize: { isMobile: boolean; isTablet: boolean; isLandscape: boolean; width: number; height: number }) => {
  const { isMobile, isTablet, isLandscape, width, height } = screenSize;
  
  // Calculate safe margins based on screen size
  const safeMarginX = Math.max(12, Math.min(24, width * 0.02));
  const safeMarginY = Math.max(12, Math.min(24, height * 0.02));
  
  // Calculate icon container size based on screen
  const getIconContainerSize = () => {
    if (isMobile) return 60;
    if (isTablet && !isLandscape) return 76;
    if (isTablet) return 72;
    return 64;
  };
  
  const iconContainerSize = getIconContainerSize();
  
  // Calculate available space
  const taskbarHeight = isMobile ? 48 : isTablet ? 36 : 28;
  const availableHeight = height - taskbarHeight - (safeMarginY * 2);
  const availableWidth = width - (safeMarginX * 2);
  
  // Calculate optimal spacing for elegant layout
  const baseSpacing = iconContainerSize + 32; // Container size + increased gap for better spacing
  const maxIconsPerColumn = Math.floor(availableHeight / baseSpacing);
  const totalIcons = 5; // We have 5 desktop icons
  
  // Determine layout: single column vs multi-column
  const needsMultipleColumns = maxIconsPerColumn < totalIcons;
  
  if (needsMultipleColumns) {
    // Multi-column layout for very narrow or short screens
    const iconsPerColumn = Math.max(2, Math.floor(totalIcons / 2));
    const actualSpacing = Math.min(baseSpacing, availableHeight / iconsPerColumn);
    
    const positions = [];
    for (let i = 0; i < totalIcons; i++) {
      const column = Math.floor(i / iconsPerColumn);
      const row = i % iconsPerColumn;
      
      const x = safeMarginX + (column * (iconContainerSize + 40)); // Increased column spacing
      const y = safeMarginY + (row * actualSpacing);
      
      // Ensure we don't exceed screen bounds
      const safeX = Math.min(x, width - iconContainerSize - safeMarginX);
      const safeY = Math.min(y, height - taskbarHeight - iconContainerSize - safeMarginY);
      
      positions.push({ x: Math.max(safeMarginX, safeX), y: Math.max(safeMarginY, safeY) });
    }
    return positions;
  } else {
    // Single column layout with elegant spacing
    const minSpacing = iconContainerSize + 24; // Minimum elegant spacing
    const optimalSpacing = Math.max(minSpacing, Math.min(baseSpacing, availableHeight / (totalIcons + 1)));
    
    return Array.from({ length: totalIcons }, (_, i) => ({
      x: safeMarginX,
      y: safeMarginY + (i * optimalSpacing)
    }));
  }
};

export const getDesktopIcons = (screenSize: { isMobile: boolean; isTablet: boolean; isLandscape: boolean; width: number; height: number }) => {
  const positions = getResponsiveIconPositions(screenSize);
  
  return [
    { 
      id: 'my-computer', 
      name: 'My Computer', 
      position: positions[0],
      tooltip: 'About Me, Skills, and Bio',
      icon: '/icons/My Computer.ico',
      windowConfig: {
        title: 'My Computer',
        icon: '/icons/My Computer.ico',
        component: MyComputer,
        isMinimized: false,
        position: { x: 0, y: 0 } // Will be centered and auto-sized
      }
    },
    { 
      id: 'my-documents', 
      name: 'My Documents', 
      position: positions[1],
      tooltip: 'My Projects and Experiences',
      icon: '/icons/Documents Folder.ico',
      windowConfig: {
        title: 'My Documents',
        icon: '/icons/Documents Folder.ico',
        component: MyDocuments,
        isMinimized: false,
        position: { x: 0, y: 0 } // Will be centered and auto-sized
      }
    },
    { 
      id: 'recycle-bin', 
      name: 'Recycle Bin', 
      position: positions[2],
      tooltip: 'Archived Projects and Ideas',
      icon: '/icons/Recycle Bin with folder and document.ico',
      windowConfig: {
        title: 'Recycle Bin',
        icon: '/icons/Recycle Bin with folder and document.ico',
        component: RecycleBin,
        isMinimized: false,
        position: { x: 0, y: 0 } // Will be centered and auto-sized
      }
    },
    { 
      id: 'the-internet', 
      name: 'Internet Explorer', 
      position: positions[3],
      tooltip: 'My Writings and Blog',
      icon: '/icons/SMALL.ico',
      windowConfig: {
        title: 'Internet Explorer',
        icon: '/icons/SMALL.ico',
        component: InternetExplorer,
        isMinimized: false,
        position: { x: 0, y: 0 } // Will be centered and auto-sized
      }
    },
    { 
      id: 'set-up-the-microsoft-network', 
      name: 'Contact Me', 
      position: positions[4],
      tooltip: 'Contact Information',
      icon: '/icons/Letter.ico',
      windowConfig: {
        title: 'Contact Information',
        icon: '/icons/Letter.ico',
        component: Contact,
        isMinimized: false,
        position: { x: 0, y: 0 } // Will be centered and auto-sized
      }
    }
  ];
};

// Keep the static version for backward compatibility
export const desktopIcons = [
  { 
    id: 'my-computer', 
    name: 'My Computer', 
    position: { x: 20, y: 20 },
    tooltip: 'About Me, Skills, and Bio',
    icon: '/icons/My Computer.ico',
    windowConfig: {
      title: 'My Computer',
      icon: '/icons/My Computer.ico',
      component: MyComputer,
      isMinimized: false,
      position: { x: 0, y: 0 } // Will be centered and auto-sized
    }
  },
  { 
    id: 'my-documents', 
    name: 'My Documents', 
    position: { x: 20, y: 100 },
    tooltip: 'My Projects and Experiences',
    icon: '/icons/Documents Folder.ico',
    windowConfig: {
      title: 'My Documents',
      icon: '/icons/Documents Folder.ico',
      component: MyDocuments,
      isMinimized: false,
      position: { x: 0, y: 0 } // Will be centered and auto-sized
    }
  },
  { 
    id: 'recycle-bin', 
    name: 'Recycle Bin', 
    position: { x: 20, y: 180 },
    tooltip: 'Archived Projects and Ideas',
    icon: '/icons/Recycle Bin with folder and document.ico',
    windowConfig: {
      title: 'Recycle Bin',
      icon: '/icons/Recycle Bin with folder and document.ico',
      component: RecycleBin,
      isMinimized: false,
      position: { x: 0, y: 0 } // Will be centered and auto-sized
    }
  },
  { 
    id: 'the-internet', 
    name: 'Internet Explorer', 
    position: { x: 20, y: 260 },
    tooltip: 'My Writings and Blog',
    icon: '/icons/SMALL.ico',
    windowConfig: {
      title: 'Internet Explorer',
      icon: '/icons/SMALL.ico',
      component: InternetExplorer,
      isMinimized: false,
      position: { x: 0, y: 0 } // Will be centered and auto-sized
    }
  },
  { 
    id: 'set-up-the-microsoft-network', 
    name: 'Contact Me', 
    position: { x: 20, y: 340 },
    tooltip: 'Contact Information',
    icon: '/icons/Letter.ico',
    windowConfig: {
      title: 'Contact Information',
      icon: '/icons/Letter.ico',
      component: Contact,
      isMinimized: false,
      position: { x: 0, y: 0 } // Will be centered and auto-sized
    }
  }
];

// Welcome window that shows on startup
export const welcomeWindow = {
  title: 'Welcome',
  icon: '/icons/Windows logo (without text).ico',
  component: Welcome,
  isMinimized: false,
  position: { x: 0, y: 0 }, // Will be centered and auto-sized
  size: { width: 800, height: 600 } // Open at 800x600
};
