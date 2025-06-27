import React, { useState, useEffect, useRef } from 'react';
import { getAvailableBackgrounds } from './BackgroundManager';

interface DisplayPropertiesProps {
  selectedBackground: string;
  onBackgroundChange: (backgroundId: string) => void;
  onClose: () => void; // Add onClose for dialog control
}

export const DisplayProperties: React.FC<DisplayPropertiesProps> = ({
  selectedBackground,
  onBackgroundChange,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('Background');
  const backgrounds = getAvailableBackgrounds();

  // Internal state for background selection (not persisted until Apply/OK)
  const [tempBackground, setTempBackground] = useState(selectedBackground);
  // Store last persisted background for Cancel
  const lastPersistedBackground = useRef(selectedBackground);

  // On mount, load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('display.background');
    if (saved && saved !== tempBackground) {
      setTempBackground(saved);
      lastPersistedBackground.current = saved;
      onBackgroundChange(saved); // Preview on open
    }
  }, []);

  // When parent changes selectedBackground (e.g. from outside dialog)
  useEffect(() => {
    setTempBackground(selectedBackground);
    lastPersistedBackground.current = selectedBackground;
  }, [selectedBackground]);

  // Handle Apply/OK/Cancel
  const handleApply = () => {
    localStorage.setItem('display.background', tempBackground);
    lastPersistedBackground.current = tempBackground;
    onBackgroundChange(tempBackground);
  };
  const handleOK = () => {
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  const tabs = ['Background', 'Screen Saver', 'Appearance', 'Settings'];

  // If the selected background is 'default', use a teal color
  const getBackgroundId = (id: string) => id === 'default' ? 'teal-bg' : id;

  return (
    <div className="h-full bg-gray-300 p-2">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-400 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm border-2 border-gray-400 ${
              activeTab === tab
                ? 'bg-gray-300 border-b-gray-300 -mb-px'
                : 'bg-gray-200 hover:bg-gray-250'
            }`}
            style={{ 
              borderStyle: activeTab === tab ? 'outset' : 'outset',
              fontFamily: '"MS Sans Serif", sans-serif'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Background Tab Content */}
      {activeTab === 'Background' && (
        <div className="space-y-4">
          <div className="border-2 border-gray-400 p-4 bg-white" style={{ borderStyle: 'inset' }}>
            <div className="text-sm mb-2 font-bold">Wallpaper:</div>
            <div className="max-h-32 overflow-y-auto border border-gray-400 bg-white">
              {backgrounds.map((bg) => (
                <div
                  key={bg.id}
                  className={`px-2 py-1 text-sm cursor-pointer hover:bg-blue-100 ${
                    tempBackground === getBackgroundId(bg.id) ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => setTempBackground(getBackgroundId(bg.id))}
                  onDoubleClick={() => {
                    setTempBackground(getBackgroundId(bg.id));
                    setTimeout(() => handleApply(), 0);
                  }}
                >
                  {bg.name}
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-gray-400 p-4 bg-white" style={{ borderStyle: 'inset' }}>
            <div className="text-sm mb-2 font-bold">Display:</div>
            <div className="flex space-x-4">
              <label className="flex items-center text-sm">
                <input type="radio" name="display" defaultChecked className="mr-2" />
                Center
              </label>
              <label className="flex items-center text-sm">
                <input type="radio" name="display" className="mr-2" />
                Tile
              </label>
              <label className="flex items-center text-sm">
                <input type="radio" name="display" className="mr-2" />
                Stretch
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button 
              className="px-6 py-2 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
              style={{ borderStyle: 'outset' }}
              onClick={handleOK}
            >
              OK
            </button>
            <button 
              className="px-6 py-2 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
              style={{ borderStyle: 'outset' }}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className="px-6 py-2 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
              style={{ borderStyle: 'outset' }}
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {activeTab !== 'Background' && (
        <div className="text-center text-gray-500 py-8">
          {activeTab} settings not implemented
        </div>
      )}
    </div>
  );
};
