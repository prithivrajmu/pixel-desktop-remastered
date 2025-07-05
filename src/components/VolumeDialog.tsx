import React from 'react';
import { useScreenSize } from '../hooks/use-mobile';

interface VolumeDialogProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (v: number) => void;
  onMuteChange: (muted: boolean) => void;
  onClose: () => void;
  position: { left: number; top: number; bottom: number };
}

export const VolumeDialog: React.FC<VolumeDialogProps> = ({ volume, isMuted, onVolumeChange, onMuteChange, onClose, position }) => {
  const screenSize = useScreenSize();
  
  // Calculate slider thumb position (0 at bottom, 100 at top)
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = rect.bottom - e.clientY;
    const newVolume = Math.max(0, Math.min(100, (y / rect.height) * 100));
    onVolumeChange(Math.round(newVolume));
  };

  // Position relative to trigger, but render on top of taskbar
  const dialogWidth = screenSize.isMobile ? 100 : 110;
  const dialogHeight = screenSize.isMobile ? 160 : 140;
  
  let left, top;
  if (screenSize.isMobile) {
    // Center on mobile
    left = (window.innerWidth - dialogWidth) / 2;
    top = Math.max(8, window.innerHeight - dialogHeight - (screenSize.isMobile ? 60 : 50));
  } else {
    left = Math.max(8, Math.min(window.innerWidth - dialogWidth - 20, position.left - dialogWidth / 2));
    top = Math.max(8, position.bottom - dialogHeight - 50);
  }

  return (
    <div
      className="fixed z-[110]"
      style={{ left, top, position: 'fixed' }}
      onClick={onClose}
    >
      <div
        className="bg-gray-200 border-2 border-gray-400 shadow-lg max-w-[98vw] p-2 relative"
        style={{ 
          borderStyle: 'outset', 
          fontFamily: 'MS Sans Serif, sans-serif', 
          width: dialogWidth,
          minWidth: screenSize.isMobile ? '100px' : '90px'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Title */}
        <div className={`text-center font-bold mb-1 ${screenSize.isMobile ? 'text-sm' : 'text-xs'}`}>
          Volume
        </div>
        {/* Slider */}
        <div className="flex flex-col items-center mb-2">
          <div 
            className="relative bg-gray-300 border border-gray-400" 
            style={{ 
              borderStyle: 'inset',
              height: screenSize.isMobile ? '100px' : '96px',
              width: screenSize.isMobile ? '32px' : '24px'
            }} 
            onClick={handleSliderClick}
          >
            {/* Volume fill triangle */}
            <svg 
              width={screenSize.isMobile ? 16 : 12} 
              height={screenSize.isMobile ? 120 : 120} 
              style={{ 
                position: 'absolute', 
                left: screenSize.isMobile ? -24 : -18, 
                top: -13 
              }}
            >
              <polygon 
                points={screenSize.isMobile ? "16,20 0,100 0,20" : "12,20 0,100 0,20"} 
                fill="none" 
                stroke="#888" 
                strokeWidth={1} 
              />
            </svg>
            {/* Slider track */}
            <div 
              className="absolute left-1/2 top-2 bottom-2 bg-gray-500" 
              style={{ 
                transform: 'translateX(-50%)',
                width: screenSize.isMobile ? '2px' : '1px'
              }} 
            />
            {/* Slider thumb */}
            <div
              className="absolute left-0 bg-gray-200 border border-gray-400 cursor-pointer"
              style={{
                borderStyle: 'outset',
                bottom: `calc(${volume}% - 8px)`,
                width: screenSize.isMobile ? '32px' : '24px',
                height: screenSize.isMobile ? '4px' : '2px'
              }}
            />
          </div>
        </div>
        {/* Mute checkbox */}
        <div className="flex items-center mt-1 mb-1">
          <input
            type="checkbox"
            checked={isMuted}
            onChange={e => onMuteChange(e.target.checked)}
            className="mr-1"
            style={{ 
              accentColor: '#888',
              width: screenSize.isMobile ? '16px' : '12px',
              height: screenSize.isMobile ? '16px' : '12px'
            }}
            id="mute-checkbox"
          />
          <label 
            htmlFor="mute-checkbox" 
            className={`select-none ${screenSize.isMobile ? 'text-sm' : 'text-xs'}`}
          >
            Mute
          </label>
        </div>
      </div>
    </div>
  );
}; 