import React from 'react';
import { 
  MyComputer, 
  MyDocuments, 
  InternetExplorer, 
  RecycleBin, 
  Welcome, 
  Contact 
} from '../components/LazyComponents';

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
    id: 'inbox', 
    name: 'My Documents', 
    position: { x: 20, y: 100 },
    tooltip: 'My Projects and Experiences',
    icon: '/icons/Documents Folder.ico',
    windowConfig: {
      title: 'Inbox',
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
      title: 'The Internet',
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
