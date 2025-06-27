import React from 'react';

interface VolumeDialogProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (v: number) => void;
  onMuteChange: (muted: boolean) => void;
  onClose: () => void;
  position: { left: number; top: number; bottom: number };
}

export const VolumeDialog: React.FC<VolumeDialogProps> = ({ volume, isMuted, onVolumeChange, onMuteChange, onClose, position }) => {
  // Calculate slider thumb position (0 at bottom, 100 at top)
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = rect.bottom - e.clientY;
    const newVolume = Math.max(0, Math.min(100, (y / rect.height) * 100));
    onVolumeChange(Math.round(newVolume));
  };

  // Position relative to trigger, but render on top of taskbar
  const dialogWidth = 110;
  const dialogHeight = 140;
  const left = Math.max(8, Math.min(window.innerWidth - dialogWidth - 20, position.left - dialogWidth / 2));
  const top = Math.max(8, position.bottom - dialogHeight - 50);

  return (
    <div
      className="fixed z-[70]"
      style={{ left, top, position: 'fixed' }}
      onClick={onClose}
    >
      <div
        className="bg-gray-200 border-2 border-gray-400 shadow-lg min-w-[90px] max-w-[98vw] p-2 relative"
        style={{ borderStyle: 'outset', fontFamily: 'MS Sans Serif, sans-serif', width: 90 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Title */}
        <div className="text-center text-xs font-bold mb-1">Volume</div>
        {/* Slider */}
        <div className="flex flex-col items-center mb-2">
          <div className="relative h-24 w-6 bg-gray-300 border border-gray-400" style={{ borderStyle: 'inset' }} onClick={handleSliderClick}>
            {/* Volume fill triangle */}
            <svg width={12} height={120} style={{ position: 'absolute', left: -18, top: -13 }}>
              <polygon points="12,20 0,100 0,20" fill="none" stroke="#888" strokeWidth={1} />
            </svg>
            {/* Slider track */}
            <div className="absolute left-1/2 top-2 bottom-2 w-1 bg-gray-500" style={{ transform: 'translateX(-50%)' }} />
            {/* Slider thumb */}
            <div
              className="absolute left-0 w-6 h-2 bg-gray-200 border border-gray-400 cursor-pointer"
              style={{
                borderStyle: 'outset',
                bottom: `calc(${volume}% - 8px)`
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
            style={{ accentColor: '#888' }}
            id="mute-checkbox"
          />
          <label htmlFor="mute-checkbox" className="text-xs select-none">Mute</label>
        </div>
      </div>
    </div>
  );
}; 