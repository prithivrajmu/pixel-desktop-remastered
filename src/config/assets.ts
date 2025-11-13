// Centralized asset configuration for the entire application
import { getVideoUrl } from './cloudinary';

export interface AssetConfig {
  id: string;
  name: string;
  path: string;
  type: 'image' | 'video' | 'icon' | 'document';
  category?: 'background' | 'screensaver' | 'icon' | 'document';
}

// Icon assets - automatically loaded from /public/icons/
export const iconAssets: Record<string, AssetConfig> = {
  'my-computer': {
    id: 'my-computer',
    name: 'My Computer',
    path: '/icons/My Computer.ico',
    type: 'icon',
    category: 'icon'
  },
  'my-documents': {
    id: 'my-documents',
    name: 'My Documents',
    path: '/icons/Desktop.ico',
    type: 'icon',
    category: 'icon'
  },
  'recycle-bin': {
    id: 'recycle-bin',
    name: 'Recycle Bin',
    path: '/icons/Recycle Bin with folder and document.ico',
    type: 'icon',
    category: 'icon'
  },
  'the-internet': {
    id: 'the-internet',
    name: 'Internet Explorer',
    path: '/icons/SMALL.ico',
    type: 'icon',
    category: 'icon'
  },
  'online-services': {
    id: 'online-services',
    name: 'Online Services',
    path: '/icons/Desktop.ico',
    type: 'icon',
    category: 'icon'
  },
  'set-up-the-microsoft-network': {
    id: 'set-up-the-microsoft-network',
    name: 'Set Up The Microsoft Network',
    path: '/icons/Desktop.ico',
    type: 'icon',
    category: 'icon'
  },
  'welcome': {
    id: 'welcome',
    name: 'Welcome',
    path: '/icons/Desktop.ico',
    type: 'icon',
    category: 'icon'
  }
};

// Background assets - images and videos
export const backgroundAssets: Record<string, AssetConfig> = {
  'default': {
    id: 'default',
    name: 'Windows 95 Default',
    path: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    type: 'image',
    category: 'background'
  },
  'custom-bg-1': {
    id: 'custom-bg-1',
    name: 'Custom Background 1',
    path: '/backgrounds/custom-bg-1.png',
    type: 'image',
    category: 'background'
  },
  'custom-bg-2': {
    id: 'custom-bg-2',
    name: 'Custom Background 2',
    path: '/backgrounds/custom-bg-2.png',
    type: 'image',
    category: 'background'
  },
  'background-video-1': {
    id: 'background-video-1',
    name: 'Background Video 1',
    path: getVideoUrl('moving_bg_3'),
    type: 'video',
    category: 'background'
  },
  'background-video-2': {
    id: 'background-video-2',
    name: 'Background Video 2',
    path: getVideoUrl('boy_runnin'),
    type: 'video',
    category: 'background'
  }
};

// Screensaver assets - videos
export const screensaverAssets: Record<string, AssetConfig> = {
  'default': {
    id: 'default',
    name: 'Default Screensaver',
    path: getVideoUrl('moving_bg_2'),
    type: 'video',
    category: 'screensaver'
  },
  'custom-screensaver-1': {
    id: 'custom-screensaver-1',
    name: 'Custom Screensaver 1',
    path: getVideoUrl('moving_bg'),
    type: 'video',
    category: 'screensaver'
  },
  'custom-screensaver-2': {
    id: 'custom-screensaver-2',
    name: 'Custom Screensaver 2',
    path: getVideoUrl('moving_bg_3'),
    type: 'video',
    category: 'screensaver'
  }
};

// Document assets - resumes, portfolios, etc.
export const documentAssets: Record<string, AssetConfig> = {
  'resume': {
    id: 'resume',
    name: 'Prithiv Raj Resume',
    path: '/resume/Prithiv_Raj_Resume_Master_Nov_13_25.pdf',
    type: 'document',
    category: 'document'
  },
  'cover-letter': {
    id: 'cover-letter',
    name: 'Cover Letter',
    path: '/resume/Cover_Letter.doc',
    type: 'document',
    category: 'document'
  },
  'portfolio': {
    id: 'portfolio',
    name: 'Portfolio Presentation',
    path: '/resume/Portfolio.ppt',
    type: 'document',
    category: 'document'
  },
  'certifications': {
    id: 'certifications',
    name: 'Certifications',
    path: '/resume/Certifications.pdf',
    type: 'document',
    category: 'document'
  }
};

// Helper functions
export const getAllAssets = (): AssetConfig[] => {
  return [
    ...Object.values(iconAssets),
    ...Object.values(backgroundAssets),
    ...Object.values(screensaverAssets),
    ...Object.values(documentAssets)
  ];
};

export const getAssetsByCategory = (category: 'background' | 'screensaver' | 'icon' | 'document'): AssetConfig[] => {
  return getAllAssets().filter(asset => asset.category === category);
};

export const getAssetsByType = (type: 'image' | 'video' | 'icon' | 'document'): AssetConfig[] => {
  return getAllAssets().filter(asset => asset.type === type);
};

export const getAssetById = (id: string): AssetConfig | undefined => {
  return getAllAssets().find(asset => asset.id === id);
};

// Get all videos (both backgrounds and screensavers)
export const getAllVideos = (): AssetConfig[] => {
  return getAllAssets().filter(asset => asset.type === 'video');
};

// Get shared videos (can be used as both background and screensaver)
export const getSharedVideos = (): AssetConfig[] => {
  const backgroundVideos = Object.values(backgroundAssets).filter(asset => asset.type === 'video');
  const screensaverVideos = Object.values(screensaverAssets);
  
  return backgroundVideos.filter(bgVideo => 
    screensaverVideos.some(ssVideo => ssVideo.path === bgVideo.path)
  );
};

// Get all documents
export const getAllDocuments = (): AssetConfig[] => {
  return getAllAssets().filter(asset => asset.type === 'document');
}; 