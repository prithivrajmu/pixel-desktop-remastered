import React, { useState, useEffect, useRef } from 'react';
import { getVideoUrl } from '../config/cloudinary';

export interface ScreenSaverOption {
  id: string;
  name: string;
  type: 'video';
  path: string;
  preview?: string;
}

interface ScreenSaverProps {
  isActive: boolean;
  onDeactivate: () => void;
  selectedScreensaver: string;
  className?: string;
}

export const ScreenSaver: React.FC<ScreenSaverProps> = ({ 
  isActive, 
  onDeactivate, 
  selectedScreensaver,
  className = "" 
}) => {
  const [screensaverError, setScreensaverError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Updated to use Cloudinary for videos
  const screensavers: Record<string, ScreenSaverOption> = {
    'default': {
      id: 'default',
      name: 'Default Screensaver',
      type: 'video',
      path: getVideoUrl('moving_bg_2')
    },
    'custom-screensaver-1': {
      id: 'custom-screensaver-1',
      name: 'Custom Screensaver 1',
      type: 'video',
      path: getVideoUrl('moving_bg')
    },
    'custom-screensaver-2': {
      id: 'custom-screensaver-2',
      name: 'Custom Screensaver 2',
      type: 'video',
      path: getVideoUrl('moving_bg_3')
    },
    // You can also reuse background videos as screensavers
    'background-video-1': {
      id: 'background-video-1',
      name: 'Background Video 1 (as Screensaver)',
      type: 'video',
      path: getVideoUrl('moving_bg_3')
    }
  };

  const currentScreensaver = screensavers[selectedScreensaver] || screensavers['default'];

  const handleMediaError = () => {
    setScreensaverError(true);
  };

  const handleClick = () => {
    onDeactivate();
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    onDeactivate();
  };

  const handleMouseMove = () => {
    onDeactivate();
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current && isActive) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setScreensaverError(true);
      });
    }
  }, [isActive, selectedScreensaver]);

  if (!isActive) return null;

  return (
    <div 
      className={`fixed inset-0 w-full h-full z-50 bg-black ${className}`}
      onClick={handleClick}
    >
      {!screensaverError ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onError={handleMediaError}
        >
          <source src={currentScreensaver.path} type="video/mp4" />
        </video>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white text-2xl">
          <div className="text-center">
            <div className="text-6xl mb-4">��️</div>
            <div>Click or move mouse to exit screensaver</div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getAvailableScreensavers = (): ScreenSaverOption[] => {
  return [
    {
      id: 'default',
      name: 'Default Screensaver',
      type: 'video',
      path: getVideoUrl('moving_bg_2')
    },
    // Add your custom screensavers here
    {
      id: 'custom-screensaver-1',
      name: 'Custom Screensaver 1',
      type: 'video',
      path: getVideoUrl('moving_bg')
    },
    {
      id: 'custom-screensaver-2',
      name: 'Custom Screensaver 2',
      type: 'video',
      path: getVideoUrl('moving_bg_3')
    },
    // You can also reuse background videos as screensavers
    {
      id: 'background-video-1',
      name: 'Background Video 1 (as Screensaver)',
      type: 'video',
      path: getVideoUrl('moving_bg_3')
    }
  ];
}; 