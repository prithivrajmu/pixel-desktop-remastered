import React, { useState } from 'react';
import { getAvailableBackgrounds } from './BackgroundManager';

interface DisplayPropertiesProps {
  selectedBackground: string;
  onBackgroundChange: (backgroundId: string) => void;
}

export const DisplayProperties: React.FC<DisplayPropertiesProps> = ({
  selectedBackground,
  onBackgroundChange
}) => {
  const [activeTab, setActiveTab] = useState('Background');
  const backgrounds = getAvailableBackgrounds();

  const tabs = ['Background', 'Screen Saver', 'Appearance', 'Settings'];

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
                    selectedBackground === bg.id ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => onBackgroundChange(bg.id)}
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
            >
              OK
            </button>
            <button 
              className="px-6 py-2 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
              style={{ borderStyle: 'outset' }}
            >
              Cancel
            </button>
            <button 
              className="px-6 py-2 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
              style={{ borderStyle: 'outset' }}
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
