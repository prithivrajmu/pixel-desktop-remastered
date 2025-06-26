
import React, { useState, useRef, useEffect } from 'react';
import { useSounds } from './SoundManager';

interface VolumeControlProps {
  className?: string;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(true);
  const [lastVolume, setLastVolume] = useState(50);
  const volumeRef = useRef<HTMLDivElement>(null);
  const sounds = useSounds();

  const handleSingleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDoubleClick = () => {
    if (isMuted) {
      setVolume(lastVolume);
      setIsMuted(false);
      sounds.setMuted(false);
      sounds.setVolume(lastVolume);
    } else {
      setLastVolume(volume);
      setVolume(0);
      setIsMuted(true);
      sounds.setMuted(true);
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = rect.bottom - e.clientY;
    const newVolume = Math.max(0, Math.min(100, (y / rect.height) * 100));
    
    setVolume(newVolume);
    const shouldBeMuted = newVolume === 0;
    setIsMuted(shouldBeMuted);
    
    // Update sound system
    sounds.setVolume(newVolume);
    sounds.setMuted(shouldBeMuted);
    
    if (newVolume > 0) {
      setLastVolume(newVolume);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return '🔇';
    if (volume < 33) return '🔈';
    if (volume < 66) return '🔉';
    return '🔊';
  };

  return (
    <div ref={volumeRef} className={`relative ${className}`}>
      <button
        className="w-6 h-6 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs"
        style={{ borderStyle: 'outset' }}
        onClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
      >
        {getVolumeIcon()}
      </button>

      {isOpen && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-32 bg-gray-300 border-2 border-gray-400 shadow-lg"
          style={{ borderStyle: 'outset' }}
        >
          <div
            className="relative h-full cursor-pointer"
            onClick={handleVolumeChange}
          >
            {/* Volume fill */}
            <div
              className="absolute bottom-0 left-1 right-1 bg-blue-600"
              style={{ height: `${volume}%` }}
            />
            {/* Volume slider thumb */}
            <div
              className="absolute w-6 h-2 bg-gray-200 border border-gray-400 left-1/2 transform -translate-x-1/2"
              style={{
                bottom: `${volume}%`,
                borderStyle: 'outset'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
