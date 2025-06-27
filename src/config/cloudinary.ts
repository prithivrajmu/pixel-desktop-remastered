// Cloudinary configuration for video hosting
// Replace 'your-cloud-name' with your actual Cloudinary cloud name

export const CLOUDINARY_CONFIG = {
  cloudName: 'dgzoebgcr', // Replace with your Cloudinary cloud name
  folder: 'v1751027614', // Optional: organize videos in a folder
};

// Helper function to generate Cloudinary video URLs
export const getCloudinaryVideoUrl = (videoName: string, options: {
  quality?: 'auto' | 'low' | 'medium' | 'high';
  format?: 'mp4' | 'webm';
  width?: number;
  height?: number;
} = {}) => {
  const { quality = 'auto', format = 'mp4', width, height } = options;
  
  let transformations = `f_${format},q_${quality}`;
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/${CLOUDINARY_CONFIG.folder}/${videoName}`;
};

// Pre-configured video URLs for your background videos
export const CLOUDINARY_VIDEOS = {
  'moving_bg_3': getCloudinaryVideoUrl('moving_bg_3.mp4', { quality: 'auto' }),
  'boy_runnin': getCloudinaryVideoUrl('boy_runnin.mp4', { quality: 'auto' }),
  'moving_bg_2': getCloudinaryVideoUrl('moving_bg_2.mp4', { quality: 'auto' }),
  'moving_bg': getCloudinaryVideoUrl('moving_bg.mp4', { quality: 'auto' }),
};

// Helper function to get video URL by name
export const getVideoUrl = (videoName: string): string => {
  return CLOUDINARY_VIDEOS[videoName as keyof typeof CLOUDINARY_VIDEOS] || 
         getCloudinaryVideoUrl(`${videoName}.mp4`);
}; 