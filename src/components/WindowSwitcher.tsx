
import React, { useEffect } from 'react';
import { WindowData } from './Desktop';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-gray-300 border-2 border-gray-400 p-4 shadow-lg" style={{ borderStyle: 'outset' }}>
        <div className="text-sm font-bold mb-2 text-center">Select Window</div>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
          {windows.map((window, index) => (
            <div
              key={window.id}
              className={`p-2 border-2 text-center text-sm cursor-pointer ${
                index === selectedIndex
                  ? 'bg-blue-600 text-white border-blue-800'
                  : 'bg-gray-200 border-gray-400 hover:bg-gray-100'
              }`}
              style={{ borderStyle: index === selectedIndex ? 'inset' : 'outset' }}
            >
              <div className="text-2xl mb-1">🪟</div>
              <div className="truncate">{window.title}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-center mt-2 opacity-75">
          Use Tab to cycle, Enter to select, Esc to cancel
        </div>
      </div>
    </div>
  );
};
