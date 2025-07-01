import React from 'react';
import { WindowData } from './Desktop';
import { VolumeControl } from './VolumeControl';
import { Clock } from './Clock';
import { useSounds } from './SoundManager';
import { useScreenSize } from '../hooks/use-mobile';

interface TaskbarProps {
  windows: WindowData[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onWindowClick,
  onStartClick,
  isStartMenuOpen,
}) => {
  const sounds = useSounds();
  const screenSize = useScreenSize();
  
  const taskbarHeight = screenSize.isMobile ? 48 : 28;
  const startButtonMinWidth = screenSize.isMobile ? 80 : screenSize.isTablet ? 64 : 60;
  const windowButtonMinWidth = screenSize.isMobile ? 100 : 80;
  const windowButtonMaxWidth = screenSize.isMobile ? 200 : 150;
  
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 w-full bg-gray-300 border-t-2 border-gray-400 flex items-center z-50"
      data-taskbar
      style={{ 
        height: `${taskbarHeight}px`,
        borderStyle: 'outset',
        fontFamily: '"MS Sans Serif", sans-serif',
        width: '100%',
        minWidth: '100%',
        maxWidth: '100vw'
      }}
    >
      {/* Start Button */}
      <button
        className={`px-2 mx-1 bg-gray-300 border border-gray-400 flex items-center space-x-1 font-bold text-xs hover:bg-gray-200 ${
          isStartMenuOpen ? 'pressed' : ''
        } ${screenSize.isTouchDevice ? 'active:bg-gray-400' : ''}`}
        style={{ 
          borderStyle: isStartMenuOpen ? 'inset' : 'outset',
          fontSize: screenSize.isMobile ? '12px' : screenSize.isTablet ? '11px' : '11px',
          height: `${taskbarHeight - 4}px`,
          minWidth: `${startButtonMinWidth}px`,
          maxWidth: '90px',
          flexShrink: screenSize.isTablet ? 1 : 0,
          touchAction: 'manipulation'
        }}
        onClick={onStartClick}
      >
        <img
          src="/icons/Windows logo (without text).ico"
          alt="Start"
          width={screenSize.isMobile ? 20 : screenSize.isTablet ? 18 : 18}
          height={screenSize.isMobile ? 20 : screenSize.isTablet ? 18 : 18}
          style={{ imageRendering: 'pixelated', marginRight: 4 }}
        />
        <span>Start</span>
      </button>

      {/* Separator */}
      <div 
        className="w-px h-5 bg-gray-500 mx-1"
        style={{ borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff' }}
      />

      {/* Window Buttons - Show ALL windows including minimized */}
      <div className="flex-1 flex space-x-px px-1 overflow-x-auto overflow-y-hidden min-w-0" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {windows.map(window => (
          <button
            key={window.id}
            className={`px-2 bg-gray-300 border border-gray-400 text-xs truncate flex-shrink-0 transition-all duration-150 flex items-center space-x-1 ${
              activeWindowId === window.id && !window.isMinimized
                ? 'bg-gray-400 border-gray-500 shadow-inner' 
                : 'hover:bg-gray-200 shadow-sm'
            } ${screenSize.isTouchDevice ? 'active:bg-gray-400' : ''}`}
            style={{ 
              borderStyle: (activeWindowId === window.id && !window.isMinimized) ? 'inset' : 'outset',
              fontWeight: (activeWindowId === window.id && !window.isMinimized) ? 'bold' : 'normal',
              maxWidth: `${windowButtonMaxWidth}px`,
              minWidth: `${windowButtonMinWidth}px`,
              height: `${taskbarHeight - 8}px`,
              fontSize: screenSize.isMobile ? '11px' : '10px',
              opacity: window.isMinimized ? 0.7 : 1,
              touchAction: 'manipulation'
            }}
            onClick={() => {
              sounds.playClick();
              onWindowClick(window.id);
            }}
            title={window.title}
          >
            {window.icon && (
              <img 
                src={window.icon} 
                alt="icon" 
                width={screenSize.isMobile ? 18 : 16} 
                height={screenSize.isMobile ? 18 : 16} 
                style={{ marginRight: 4, imageRendering: 'pixelated' }} 
              />
            )}
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div 
        className="flex items-center bg-gray-300 flex-shrink-0"
        style={{ 
          borderStyle: 'inset',
          height: `${taskbarHeight - 4}px`,
          minHeight: `${taskbarHeight - 4}px`,
          maxHeight: `${taskbarHeight - 4}px`,
          marginRight: '2px',
          alignItems: 'center',
          padding: screenSize.isMobile ? '0 2px' : '0 2px',
          gap: screenSize.isMobile ? '2px' : '4px',
          minWidth: screenSize.isMobile ? '80px' : 'auto'
        }}
      >
        <VolumeControl />
        <Clock />
      </div>
    </div>
  );
};
