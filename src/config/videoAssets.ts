import { getVideoUrl } from './cloudinary';

export interface VideoAsset {
  id: string;
  name: string;
  path: string;
  type: 'background' | 'screensaver';
}

// Centralized video asset configuration
export const videoAssets = {
  backgrounds: {
    'shadows-on-wall': {
      id: 'shadows-on-wall',
      name: 'Shadows on Wall',
      path: getVideoUrl('moving_bg_3')
    },
    'boy-running': {
      id: 'boy-running',
      name: 'Boy Running',
      path: getVideoUrl('boy_runnin')
    },
    'grasslands': {
      id: 'grasslands',
      name: 'Grasslands',
      path: getVideoUrl('moving_bg_2')
    },
    'flowers': {
      id: 'flowers',
      name: 'Flowers',
      path: getVideoUrl('moving_bg')
    }
  },
  screensavers: {
    'default-screensaver': {
      id: 'default-screensaver',
      name: 'Default Screensaver',
      path: getVideoUrl('moving_bg_2')
    },
    'custom-screensaver-1': {
      id: 'custom-screensaver-1',
      name: 'Custom Screensaver 1',
      path: getVideoUrl('moving_bg')
    },
    'custom-screensaver-2': {
      id: 'custom-screensaver-2',
      name: 'Custom Screensaver 2',
      path: getVideoUrl('moving_bg_3')
    }
  }
};

// Helper function to get all available videos
export const getAllVideos = () => {
  const allVideos = { ...videoAssets.backgrounds, ...videoAssets.screensavers };
  return Object.values(allVideos);
};

// Helper function to get shared videos (can be used as both background and screensaver)
export const getSharedVideos = () => {
  const backgroundVideos = Object.values(videoAssets.backgrounds);
  const screensaverVideos = Object.values(videoAssets.screensavers);
  
  return backgroundVideos.filter(bgVideo => 
    screensaverVideos.some(ssVideo => ssVideo.path === bgVideo.path)
  );
}; 