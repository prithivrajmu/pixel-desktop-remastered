import React, { useState, useEffect } from 'react';

export interface BackgroundOption {
  id: string;
  name: string;
  type: 'image' | 'video';
  path: string;
  preview?: string;
}

interface BackgroundManagerProps {
  selectedBackground: string;
  className?: string;
}

export const BackgroundManager: React.FC<BackgroundManagerProps> = ({ 
  selectedBackground, 
  className = "" 
}) => {
  const [backgroundError, setBackgroundError] = useState(false);

  // Updated to use the unified videos folder
  const backgrounds: Record<string, BackgroundOption> = {
    'default': {
      id: 'default',
      name: 'Windows 95 Default',
      type: 'image',
      path: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
    },
    // Add your custom backgrounds here
    'custom-bg-1': {
      id: 'custom-bg-1',
      name: 'Windows Classic 1',
      type: 'image',
      path: '/backgrounds/windows_95_os.png'
    },
    'custom-bg-2': {
      id: 'custom-bg-2',
      name: 'Windows Classic 2',
      type: 'image',
      path: '/backgrounds/windows_95_os_2.png'
    },
    // Video backgrounds now use the unified videos folder
    'background-video-1': {
      id: 'background-video-1',
      name: 'Shadows On a Wall',
      type: 'video',
      path: '/videos/moving_bg_3.mp4'
    },
    'background-video-2': {
      id: 'background-video-2',
      name: 'Boy Running',
      type: 'video',
      path: '/videos/boy_runnin.mp4'
    },
    'background-video-3': {
      id: 'background-video-3',
      name: 'Grasslands',
      type: 'video',
      path: '/videos/moving_bg_2.mp4'
    },
    'background-video-4': {
      id: 'background-video-4',
      name: 'Flowers',
      type: 'video',
      path: '/videos/moving_bg.mp4'
    }
  };

  const currentBackground = backgrounds[selectedBackground] || backgrounds['default'];

  const handleMediaError = () => {
    setBackgroundError(true);
  };

  if (selectedBackground === 'teal-bg') {
    return (
      <div
        className={`fixed inset-0 w-full h-full ${className}`}
        style={{ backgroundColor: '#008080' }}
      />
    );
  }

  if (currentBackground.type === 'video' && !backgroundError) {
    return (
      <video
        key={currentBackground.id}
        className={`fixed inset-0 w-full h-full object-cover ${className}`}
        autoPlay
        loop
        muted
        playsInline
        onError={handleMediaError}
      >
        <source src={currentBackground.path} type="video/mp4" />
      </video>
    );
  }

  return (
    <div 
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        backgroundImage: backgroundError ? 
          `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` : 
          `url(${currentBackground.path})`,
        backgroundSize: currentBackground.type === 'image' ? 'cover' : 'auto',
        backgroundRepeat: currentBackground.type === 'image' ? 'no-repeat' : 'repeat',
        backgroundPosition: 'center'
      }}
    />
  );
};

export const getAvailableBackgrounds = (): BackgroundOption[] => {
  return [
    {
      id: 'default',
      name: 'Windows 95 Default',
      type: 'image',
      path: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
    },
    // Add your custom backgrounds here
    {
      id: 'custom-bg-1',
      name: 'Windows Classic 1',
      type: 'image',
      path: '/backgrounds/windows_95_os.png'
    },
    {
      id: 'custom-bg-2',
      name: 'Windows Classic 2',
      type: 'image',
      path: '/backgrounds/windows_95_os_2.png'
    },
    // Video backgrounds now use the unified videos folder
    {
      id: 'background-video-1',
      name: 'Shadows On a Wall',
      type: 'video',
      path: '/videos/moving_bg_3.mp4'
    },
    {
      id: 'background-video-2',
      name: 'Boy Running',
      type: 'video',
      path: '/videos/boy_running.mp4'
    },
    {
      id: 'background-video-3',
      name: 'Grasslands',
      type: 'video',
      path: '/videos/moving_bg_2.mp4'
    },
    {
      id: 'background-video-4',
      name: 'Flowers',
      type: 'video',
      path: '/videos/moving_bg_1.mp4'
    }
  ];
};
