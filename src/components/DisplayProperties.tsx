import React, { useState, useEffect, useRef } from 'react';
import { getAvailableBackgrounds } from './BackgroundManager';
import { videoAssets } from '../config/videoAssets';
import { useSounds } from './SoundManager';

interface DisplayPropertiesProps {
  selectedBackground: string;
  onBackgroundChange: (backgroundId: string) => void;
  onClose: () => void;
}

export const DisplayProperties: React.FC<DisplayPropertiesProps> = ({
  selectedBackground,
  onBackgroundChange,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('Background');
  const [tempBackground, setTempBackground] = useState(selectedBackground);
  const [selectedVideo, setSelectedVideo] = useState('(None)');
  const [tempVideo, setTempVideo] = useState('(None)');
  const [displayMode, setDisplayMode] = useState('Center');
  const [hasChanges, setHasChanges] = useState(false);
  
  // Store the original background when dialog opens - this is what Cancel should revert to
  const originalBackground = useRef(selectedBackground);
  const sounds = useSounds();

  const backgrounds = getAvailableBackgrounds();
  const videoOptions = ['(None)', ...Object.values(videoAssets.backgrounds).map(v => v.name)];
  const tabs = ['Background', 'Screen Saver', 'Appearance', 'Settings'];

  // Initialize state based on current background
  useEffect(() => {
    // Store the original background that was active when dialog opened
    originalBackground.current = selectedBackground;
    
    // Check if current background is a video
    const currentVideo = Object.values(videoAssets.backgrounds).find(v => v.id === selectedBackground);
    if (currentVideo) {
      setSelectedVideo(currentVideo.name);
      setTempVideo(currentVideo.name);
      setTempBackground('');
    } else {
      setSelectedVideo('(None)');
      setTempVideo('(None)');
      setTempBackground(selectedBackground);
    }
  }, [selectedBackground]);

  const handleTabClick = (tab: string) => {
    sounds.playClick();
    setActiveTab(tab);
  };

  const handleApply = () => {
    sounds.playClick();
    
    // Apply video background if selected
    if (tempVideo !== '(None)') {
      const videoAsset = Object.values(videoAssets.backgrounds).find(v => v.name === tempVideo);
      if (videoAsset) {
        localStorage.setItem('display.background', videoAsset.id);
        originalBackground.current = videoAsset.id; // Update original to new applied state
        onBackgroundChange(videoAsset.id);
      }
    } else {
      // Apply wallpaper background
      localStorage.setItem('display.background', tempBackground);
      originalBackground.current = tempBackground; // Update original to new applied state
      onBackgroundChange(tempBackground);
    }
    
    setHasChanges(false);
    // Don't close the window - let user see the changes and make further adjustments
  };

  const handleOK = () => {
    sounds.playClick();
    if (hasChanges) {
      handleApply();
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    sounds.playClick();
    // Restore to the background that was active when dialog was opened
    onBackgroundChange(originalBackground.current);
    onClose();
  };

  const handleWallpaperSelect = (backgroundId: string) => {
    sounds.playClick();
    setTempBackground(backgroundId);
    setTempVideo('(None)'); // Clear video selection
    setHasChanges(true);
    // Preview immediately
    onBackgroundChange(backgroundId);
  };

  const handleWallpaperDoubleClick = (backgroundId: string) => {
    sounds.playClick();
    setTempBackground(backgroundId);
    setTempVideo('(None)');
    setHasChanges(false); // Mark as applied
    // Apply immediately but keep window open
    localStorage.setItem('display.background', backgroundId);
    originalBackground.current = backgroundId; // Update original since it's now applied
    onBackgroundChange(backgroundId);
  };

  const handleVideoSelect = (video: string) => {
    sounds.playClick();
    setSelectedVideo(video);
    setTempVideo(video);
    if (video !== '(None)') {
      setTempBackground(''); // Clear wallpaper selection
    }
    setHasChanges(true);
  };

  const handleVideoDoubleClick = (video: string) => {
    sounds.playClick();
    setSelectedVideo(video);
    setTempVideo(video);
    setHasChanges(false); // Mark as applied
    
    if (video === '(None)') {
      // Revert to default wallpaper
      setTempBackground('default');
      localStorage.setItem('display.background', 'default');
      originalBackground.current = 'default'; // Update original since it's now applied
      onBackgroundChange('default');
    } else {
      // Apply video background but keep window open
      setTempBackground(''); // Clear wallpaper selection
      const videoAsset = Object.values(videoAssets.backgrounds).find(v => v.name === video);
      if (videoAsset) {
        localStorage.setItem('display.background', videoAsset.id);
        originalBackground.current = videoAsset.id; // Update original since it's now applied
        onBackgroundChange(videoAsset.id);
      }
    }
  };

  const handleDisplayModeChange = (mode: string) => {
    sounds.playClick();
    setDisplayMode(mode);
  };

  return (
    <div 
      className="w-full h-full bg-[#c0c0c0] flex flex-col"
      style={{ fontFamily: '"MS Sans Serif", sans-serif' }}
    >
      {/* Tab Navigation */}
      <div className="flex bg-[#c0c0c0] px-2 pt-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`px-4 py-1 text-xs border-2 mr-px ${
              activeTab === tab
                ? 'bg-[#c0c0c0] border-gray-400 border-b-[#c0c0c0] -mb-px z-10'
                : 'bg-gray-300 border-gray-500 hover:bg-gray-200'
            }`}
            style={{
              borderStyle: 'outset',
              borderBottomStyle: activeTab === tab ? 'none' : 'outset'
            }}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 bg-[#c0c0c0] border-t-2 border-gray-400 p-3" style={{ borderTopStyle: 'inset' }}>
        {activeTab === 'Background' && (
          <div className="h-full flex flex-col">
            {/* Monitor Preview */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                {/* CRT Monitor */}
                <div 
                  className="w-48 h-36 bg-[#c0c0c0] border-2 border-gray-600 rounded-sm relative"
                  style={{ 
                    borderStyle: 'outset',
                    background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)'
                  }}
                >
                  {/* Screen bezel - outer */}
                  <div className="absolute inset-2 bg-gray-800 border border-gray-500" style={{ borderStyle: 'inset' }}>
                    {/* Screen bezel - inner */}
                    <div className="absolute inset-1 bg-black border border-gray-600" style={{ borderStyle: 'inset' }}>
                      {/* Screen content - shows selected background */}
                      <div 
                        className="absolute inset-1 flex items-center justify-center"
                                                 style={{ 
                           backgroundColor: 
                             tempVideo !== '(None)' ? '#000000' : // Black for video preview
                             tempBackground === 'default' || !tempBackground ? '#008080' : 
                             tempBackground === 'windows_95_os' ? '#c0c0c0' :
                             tempBackground === 'windows_95_os_2' ? '#000080' :
                             tempBackground === 'windows_95_logo' ? '#000080' : '#008080'
                         }}
                      >
                                                 {(tempVideo !== '(None)' || tempBackground !== 'default') && (
                           <div className="text-white text-[6px] text-center opacity-80">
                             {tempVideo !== '(None)' ? 'Video' : 'Preview'}
                           </div>
                         )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Power LED */}
                  <div className="absolute bottom-2 right-3 w-1 h-1 bg-green-400 rounded-full"></div>
                  
                  {/* Brand label */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[6px] text-gray-600">
                    MONITOR
                  </div>
                </div>
                
                {/* Monitor stand */}
                <div className="w-4 h-5 bg-[#c0c0c0] mx-auto border border-gray-500" style={{ borderStyle: 'outset' }}></div>
                <div className="w-32 h-3 bg-[#c0c0c0] mx-auto border border-gray-500" style={{ borderStyle: 'outset' }}>
                  <div className="w-20 h-1 bg-gray-400 mx-auto mt-1"></div>
                </div>
              </div>
            </div>

            {/* Main Content - Video and Wallpaper sections */}
            <div className="flex-1 flex space-x-4">
              {/* Video Section */}
              <div className="flex-1">
                <div className="border-2 border-gray-400 p-2" style={{ borderStyle: 'outset' }}>
                  <div className="text-xs font-bold mb-2">Video</div>
                  <div 
                    className="h-24 bg-white border-2 border-gray-400 overflow-y-auto focus:outline-dotted focus:outline-1 focus:outline-black"
                    style={{ borderStyle: 'inset' }}
                    tabIndex={0}
                  >
                                         {videoOptions.map((video, index) => (
                       <div
                         key={video}
                         className={`px-2 py-0.5 text-xs cursor-pointer ${
                           selectedVideo === video 
                             ? 'bg-[#0000ff] text-white' 
                             : 'hover:bg-gray-100'
                         }`}
                         onClick={() => handleVideoSelect(video)}
                         onDoubleClick={() => handleVideoDoubleClick(video)}
                       >
                         {video}
                       </div>
                     ))}
                  </div>
                  <button 
                    className="mt-2 px-3 py-1 bg-gray-300 border-2 border-gray-500 text-xs text-gray-500 cursor-not-allowed"
                    style={{ borderStyle: 'inset' }}
                    disabled
                  >
                    Edit Video...
                  </button>
                </div>
              </div>

              {/* Wallpaper Section */}
              <div className="flex-1">
                <div className="border-2 border-gray-400 p-2" style={{ borderStyle: 'outset' }}>
                  <div className="text-xs font-bold mb-2">Wallpaper</div>
                  <div 
                    className="h-24 bg-white border-2 border-gray-400 overflow-y-auto"
                    style={{ borderStyle: 'inset' }}
                  >
                                         {backgrounds.map((bg) => (
                       <div
                         key={bg.id}
                         className={`px-2 py-0.5 text-xs cursor-pointer ${
                           tempBackground === bg.id && tempVideo === '(None)'
                             ? 'bg-[#0000ff] text-white' 
                             : 'hover:bg-gray-100'
                         }`}
                         onClick={() => handleWallpaperSelect(bg.id)}
                         onDoubleClick={() => handleWallpaperDoubleClick(bg.id)}
                       >
                         {bg.name}
                       </div>
                     ))}
                  </div>
                  <button 
                    className="mt-2 px-3 py-1 bg-[#c0c0c0] border-2 border-gray-400 text-xs hover:bg-gray-200"
                    style={{ borderStyle: 'outset' }}
                    onClick={() => sounds.playClick()}
                  >
                    Browse...
                  </button>
                  
                  {/* Display Options */}
                  <div className="mt-3">
                    <div className="text-xs mb-1">Display:</div>
                    <div className="space-y-1">
                      <label className="flex items-center text-xs cursor-pointer">
                        <div className="relative mr-2">
                          <input 
                            type="radio" 
                            name="display" 
                            value="Tile"
                            checked={displayMode === 'Tile'}
                            onChange={() => handleDisplayModeChange('Tile')}
                            className="sr-only"
                          />
                          <div 
                            className={`w-3 h-3 rounded-full border-2 border-gray-600 bg-white flex items-center justify-center ${
                              displayMode === 'Tile' ? 'border-black' : ''
                            }`}
                            style={{ borderStyle: 'inset' }}
                          >
                            {displayMode === 'Tile' && (
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                            )}
                          </div>
                        </div>
                        Tile
                      </label>
                      <label className="flex items-center text-xs cursor-pointer">
                        <div className="relative mr-2">
                          <input 
                            type="radio" 
                            name="display" 
                            value="Center"
                            checked={displayMode === 'Center'}
                            onChange={() => handleDisplayModeChange('Center')}
                            className="sr-only"
                          />
                          <div 
                            className={`w-3 h-3 rounded-full border-2 border-gray-600 bg-white flex items-center justify-center ${
                              displayMode === 'Center' ? 'border-black' : ''
                            }`}
                            style={{ borderStyle: 'inset' }}
                          >
                            {displayMode === 'Center' && (
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                            )}
                          </div>
                        </div>
                        Center
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'Background' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-600">
              <div className="text-sm mb-2">{activeTab}</div>
              <div className="text-xs">Settings not implemented</div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-[#c0c0c0] p-3 flex justify-end space-x-2 border-t border-gray-400">
        <button 
          className="px-6 py-1 bg-[#c0c0c0] border-2 border-gray-400 text-xs hover:bg-gray-200"
          style={{ 
            borderStyle: 'outset',
            borderColor: '#000000 #c0c0c0 #c0c0c0 #000000',
            borderWidth: '2px'
          }}
          onClick={handleOK}
        >
          <u>O</u>K
        </button>
        <button 
          className="px-6 py-1 bg-[#c0c0c0] border-2 border-gray-400 text-xs hover:bg-gray-200"
          style={{ borderStyle: 'outset' }}
          onClick={handleCancel}
        >
          <u>C</u>ancel
        </button>
                 <button 
           className={`px-6 py-1 text-xs ${
             hasChanges 
               ? 'bg-[#c0c0c0] border-2 border-gray-400 hover:bg-gray-200 cursor-pointer' 
               : 'bg-gray-300 border-2 border-gray-500 text-gray-500 cursor-not-allowed'
           }`}
           style={{ borderStyle: hasChanges ? 'outset' : 'inset' }}
           disabled={!hasChanges}
           onClick={hasChanges ? handleApply : undefined}
         >
           <u>A</u>pply
         </button>
      </div>
    </div>
  );
};
