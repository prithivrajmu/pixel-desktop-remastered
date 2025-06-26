
import React from 'react';
import { MyComputer } from '../components/applications/MyComputer';
import { MyDocuments } from '../components/applications/MyDocuments';
import { InternetExplorer } from '../components/applications/InternetExplorer';
import { Notepad } from '../components/applications/Notepad';
import { RecycleBin } from '../components/applications/RecycleBin';
import { Welcome } from '../components/applications/Welcome';

export const desktopIcons = [
  { 
    id: 'my-computer', 
    name: 'My Computer', 
    icon: '💻', 
    position: { x: 20, y: 20 },
    tooltip: 'About Me, Skills, and Bio',
    windowConfig: {
      title: 'My Computer',
      component: MyComputer,
      isMinimized: false,
      position: { x: 0, y: 0 }, // Will be centered
      size: { width: 500, height: 400 }
    }
  },
  { 
    id: 'inbox', 
    name: 'Inbox', 
    icon: '📥', 
    position: { x: 20, y: 100 },
    tooltip: 'Messages and Communications',
    windowConfig: {
      title: 'Inbox',
      component: MyDocuments,
      isMinimized: false,
      position: { x: 0, y: 0 },
      size: { width: 600, height: 500 }
    }
  },
  { 
    id: 'recycle-bin', 
    name: 'Recycle Bin', 
    icon: '🗑️', 
    position: { x: 20, y: 180 },
    tooltip: 'Archived Projects and Ideas',
    windowConfig: {
      title: 'Recycle Bin',
      component: RecycleBin,
      isMinimized: false,
      position: { x: 0, y: 0 },
      size: { width: 450, height: 400 }
    }
  },
  { 
    id: 'the-internet', 
    name: 'The Internet', 
    icon: '🌐', 
    position: { x: 20, y: 260 },
    tooltip: 'My Writings and Blog',
    windowConfig: {
      title: 'The Internet',
      component: InternetExplorer,
      isMinimized: false,
      position: { x: 0, y: 0 },
      size: { width: 700, height: 500 }
    }
  },
  { 
    id: 'online-services', 
    name: 'Online Services', 
    icon: '📁', 
    position: { x: 20, y: 340 },
    tooltip: 'My Projects and Portfolio',
    windowConfig: {
      title: 'Online Services',
      component: MyDocuments,
      isMinimized: false,
      position: { x: 0, y: 0 },
      size: { width: 600, height: 500 }
    }
  },
  { 
    id: 'set-up-the-microsoft-network', 
    name: 'Set Up The Microsoft Network', 
    icon: '🔧', 
    position: { x: 20, y: 420 },
    tooltip: 'Contact and Network',
    windowConfig: {
      title: 'Network Setup',
      component: Notepad,
      isMinimized: false,
      position: { x: 0, y: 0 },
      size: { width: 500, height: 400 }
    }
  }
];

// Welcome window that shows on startup
export const welcomeWindow = {
  title: 'Welcome',
  component: Welcome,
  isMinimized: false,
  position: { x: 0, y: 0 }, // Will be centered
  size: { width: 500, height: 350 }
};
