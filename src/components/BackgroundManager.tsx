import React, { useState, useEffect, memo, useRef } from 'react';
import { getVideoUrl } from '../config/cloudinary';
import { videoAssets } from '../config/videoAssets';

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

export const BackgroundManager: React.FC<BackgroundManagerProps> = memo(({ 
  selectedBackground, 
  className = "" 
}) => {
  const [backgroundError, setBackgroundError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Static wallpaper backgrounds only
  const backgrounds: Record<string, BackgroundOption> = {
    'default': {
      id: 'default',
      name: 'Windows 95 Default (Teal)',
      type: 'image',
      path: '#008080' // Solid teal color
    },
    'windows_95_os': {
      id: 'windows_95_os',
      name: 'Windows 95 OS',
      type: 'image',
      path: '/backgrounds/windows_95_os.png'
    },
    'windows_95_os_2': {
      id: 'windows_95_os_2',
      name: 'Windows 95 OS 2',
      type: 'image',
      path: '/backgrounds/windows_95_os_2.png'
    },
    'windows_95_logo': {
      id: 'windows_95_logo',
      name: 'Windows 95 Logo',
      type: 'image',
      path: '/backgrounds/windows_95_logo.jpg'
    }
  };

  // Check if it's a video background from videoAssets
  const videoBackground = Object.values(videoAssets.backgrounds).find(v => v.id === selectedBackground);
  
  const currentBackground = backgrounds[selectedBackground] || backgrounds['default'];

  const handleMediaError = () => {
    setBackgroundError(true);
  };

  // Handle video backgrounds
  if (videoBackground && !backgroundError) {
    return (
      <video
        key={videoBackground.id}
        className={`fixed inset-0 w-full h-full object-cover ${className}`}
        autoPlay
        loop
        muted
        playsInline
        onError={handleMediaError}
      >
        <source src={videoBackground.path} type="video/mp4" />
      </video>
    );
  }

  // Handle default teal background
  if (selectedBackground === 'default' || currentBackground.path === '#008080') {
    return (
      <div
        className={`fixed inset-0 w-full h-full ${className}`}
        style={{ backgroundColor: '#008080' }}
      />
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
});

export const getAvailableBackgrounds = (): BackgroundOption[] => {
  return [
    {
      id: 'default',
      name: 'Windows 95 Default (Teal)',
      type: 'image',
      path: '#008080'
    },
    {
      id: 'windows_95_os',
      name: 'Windows 95 OS',
      type: 'image',
      path: '/backgrounds/windows_95_os.png'
    },
    {
      id: 'windows_95_os_2',
      name: 'Windows 95 OS 2',
      type: 'image',
      path: '/backgrounds/windows_95_os_2.png'
    },
    {
      id: 'windows_95_logo',
      name: 'Windows 95 Logo',
      type: 'image',
      path: '/backgrounds/windows_95_logo.jpg'
    }
  ];
};

BackgroundManager.displayName = 'BackgroundManager';
