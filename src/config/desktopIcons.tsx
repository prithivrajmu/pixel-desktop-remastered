
import React from 'react';
import { MyComputer } from '../components/applications/MyComputer';
import { MyDocuments } from '../components/applications/MyDocuments';
import { InternetExplorer } from '../components/applications/InternetExplorer';
import { Notepad } from '../components/applications/Notepad';
import { RecycleBin } from '../components/applications/RecycleBin';

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
      position: { x: 100, y: 100 },
      size: { width: 500, height: 400 }
    },
    onDoubleClick: function() {
      // This will be handled by the parent component
    }
  },
  { 
    id: 'my-documents', 
    name: 'My Documents', 
    icon: '📁', 
    position: { x: 20, y: 120 },
    tooltip: 'My Projects',
    windowConfig: {
      title: 'My Documents',
      component: MyDocuments,
      isMinimized: false,
      position: { x: 150, y: 150 },
      size: { width: 600, height: 500 }
    },
    onDoubleClick: function() {
      // This will be handled by the parent component
    }
  },
  { 
    id: 'internet-explorer', 
    name: 'Internet Explorer', 
    icon: '🌐', 
    position: { x: 20, y: 220 },
    tooltip: 'My Writings',
    windowConfig: {
      title: 'Internet Explorer',
      component: InternetExplorer,
      isMinimized: false,
      position: { x: 200, y: 100 },
      size: { width: 700, height: 500 }
    },
    onDoubleClick: function() {
      // This will be handled by the parent component
    }
  },
  { 
    id: 'notepad', 
    name: 'Notepad', 
    icon: '📝', 
    position: { x: 20, y: 320 },
    tooltip: 'Contact Me',
    windowConfig: {
      title: 'Contact - Notepad',
      component: Notepad,
      isMinimized: false,
      position: { x: 200, y: 200 },
      size: { width: 500, height: 400 }
    },
    onDoubleClick: function() {
      // This will be handled by the parent component
    }
  },
  { 
    id: 'recycle-bin', 
    name: 'Recycle Bin', 
    icon: '🗑️', 
    position: { x: 20, y: 420 },
    tooltip: 'Archived Projects and Ideas',
    windowConfig: {
      title: 'Recycle Bin',
      component: RecycleBin,
      isMinimized: false,
      position: { x: 250, y: 250 },
      size: { width: 450, height: 400 }
    },
    onDoubleClick: function() {
      // This will be handled by the parent component
    }
  }
];
