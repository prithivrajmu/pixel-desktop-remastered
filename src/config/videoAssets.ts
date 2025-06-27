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
    'background-video-1': {
      id: 'background-video-1',
      name: 'Background Video 1',
      path: getVideoUrl('moving_bg_3')
    },
    'background-video-2': {
      id: 'background-video-2',
      name: 'Background Video 2',
      path: getVideoUrl('boy_runnin')
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