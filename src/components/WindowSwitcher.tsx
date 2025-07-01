import React, { useEffect } from 'react';
import { WindowData } from './Desktop';
import { useScreenSize } from '../hooks/use-mobile';

interface WindowSwitcherProps {
  isVisible: boolean;
  windows: WindowData[];
  selectedIndex: number;
  onSelect: (windowId: string) => void;
  onClose: () => void;
}

export const WindowSwitcher: React.FC<WindowSwitcherProps> = ({
  isVisible,
  windows,
  selectedIndex,
  onSelect,
  onClose,
}) => {
  const screenSize = useScreenSize();

  useEffect(() => {
    if (isVisible && windows.length > 0) {
      const selectedWindow = windows[selectedIndex];
      if (selectedWindow) {
        onSelect(selectedWindow.id);
      }
    }
  }, [selectedIndex, windows, onSelect, isVisible]);

  if (!isVisible || windows.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
      <div 
        className="bg-gray-300 border-2 border-gray-400 p-4 shadow-lg"
        style={{ 
          borderStyle: 'outset',
          maxWidth: screenSize.isMobile ? '90vw' : '500px',
          maxHeight: screenSize.isMobile ? '80vh' : '400px'
        }}
      >
        <div className={`font-bold mb-3 text-center ${screenSize.isMobile ? 'text-base' : 'text-sm'}`}>
          Select Window
        </div>
        <div 
          className="grid gap-3 overflow-y-auto"
          style={{ 
            gridTemplateColumns: screenSize.isMobile 
              ? '1fr' 
              : 'repeat(auto-fit, minmax(120px, 1fr))',
            maxHeight: screenSize.isMobile ? '50vh' : '300px'
          }}
        >
          {windows.map((window, index) => (
            <div
              key={window.id}
              className={`p-3 border-2 text-center cursor-pointer ${
                index === selectedIndex
                  ? 'bg-blue-600 text-white border-blue-800'
                  : 'bg-gray-200 border-gray-400 hover:bg-gray-100'
              } ${screenSize.isTouchDevice ? 'active:bg-blue-400' : ''}`}
              style={{ 
                borderStyle: index === selectedIndex ? 'inset' : 'outset',
                minHeight: screenSize.isMobile ? '60px' : '80px',
                touchAction: 'manipulation'
              }}
            >
              <div className={`mb-2 ${screenSize.isMobile ? 'text-4xl' : 'text-2xl'}`}>
                🪟
              </div>
              <div className={`truncate ${screenSize.isMobile ? 'text-sm' : 'text-xs'}`}>
                {window.title}
              </div>
            </div>
          ))}
        </div>
        <div className={`text-center mt-3 opacity-75 ${screenSize.isMobile ? 'text-sm' : 'text-xs'}`}>
          {screenSize.isTouchDevice 
            ? 'Tap to select' 
            : 'Use Tab to cycle, Enter to select, Esc to cancel'}
        </div>
      </div>
    </div>
  );
};
