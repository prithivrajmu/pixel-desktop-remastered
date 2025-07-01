import React, { useState, useEffect, useRef } from 'react';
import { getAvailableBackgrounds } from './BackgroundManager';
import { videoAssets } from '../config/videoAssets';
import { useSounds } from './SoundManager';
import { useScreenSize } from '../hooks/use-mobile';

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
  const screenSize = useScreenSize();

  // Helper flags for responsive layouts
  const isMobilePortrait = screenSize.isMobile && !screenSize.isLandscape;
  const isMobileLandscape = screenSize.isMobile && screenSize.isLandscape;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024; // md to lg
  const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
  const isExtraLargeScreen = window.innerWidth >= 1280; // xl breakpoint
  const isLargeOrTablet = isTablet || isLargeScreen || isExtraLargeScreen;

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
      style={{ 
        fontFamily: '"MS Sans Serif", sans-serif',
        maxHeight: '100vh' // Ensure we don't exceed viewport height
      }}
    >
      {/* Tab Navigation */}
      <div className={`flex bg-[#c0c0c0] px-2 pt-2 flex-shrink-0 ${
        isMobilePortrait ? 'flex-wrap gap-1' : screenSize.isMobile ? 'flex-wrap' : ''
      }`}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`py-1 text-xs border-2 mr-px mb-px ${
              activeTab === tab
                ? 'bg-[#c0c0c0] border-gray-400 border-b-[#c0c0c0] -mb-px z-10'
                : 'bg-gray-300 border-gray-500 hover:bg-gray-200'
            } ${
              isMobilePortrait 
                ? 'flex-1 px-1 min-w-0' 
                : screenSize.isMobile 
                ? 'flex-1 px-2 min-w-0' 
                : 'px-2'
            }`}
            style={{
              borderStyle: 'outset',
              borderBottomStyle: activeTab === tab ? 'none' : 'outset',
              fontSize: isMobilePortrait ? '9px' : 
                        screenSize.isMobile ? '10px' : 
                        isLargeScreen ? '13px' : '11px',
              minWidth: screenSize.isMobile ? 'auto' : isLargeScreen ? '80px' : '60px',
              minHeight: screenSize.isTouchDevice ? 
                        (isMobileLandscape ? '28px' : '32px') : 
                        isLargeScreen ? '36px' : 'auto'
            }}
            onClick={() => handleTabClick(tab)}
          >
            {isMobilePortrait ? tab.substring(0, 3) : screenSize.isMobile ? tab.substring(0, 4) : tab}
          </button>
        ))}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Tab Content Area - Smart Responsive Layout with proper scrolling */}
        <div className={`bg-[#c0c0c0] border-t-2 border-gray-400 flex flex-col min-h-0 ${
          isLargeScreen ? 'p-4' : 
          isMobileLandscape ? 'p-1' : 'p-2'
        }`} style={{ borderTopStyle: 'inset' }}>
          {activeTab === 'Background' && (
            <div className="flex flex-col min-h-0 flex-1">
              {/* Icon Preview - Direct Display */}
              <div className={`flex justify-center flex-shrink-0 ${
                isMobilePortrait ? 'mb-2' : 
                isMobileLandscape ? 'mb-1' :
                screenSize.isMobile ? 'mb-2' : 
                isLargeScreen ? 'mb-4' : 'mb-3'
              }`}>
                {tempVideo !== '(None)' ? (
                  <img 
                    src="/icons/Beizer.ico" 
                    alt="Video Preview"
                    className={`${
                      isMobilePortrait ? 'w-8 h-8' : 
                      screenSize.isMobile ? 'w-10 h-10' :
                      isExtraLargeScreen ? 'w-20 h-20' :
                      isLargeScreen ? 'w-16 h-16' : 'w-12 h-12'
                    }`}
                    style={{ imageRendering: 'pixelated' }}
                  />
                ) : tempBackground !== 'default' && tempBackground ? (
                  <img 
                    src="/icons/3D Text.ico" 
                    alt="Wallpaper Preview"
                    className={`${
                      isMobilePortrait ? 'w-8 h-8' : 
                      screenSize.isMobile ? 'w-10 h-10' :
                      isExtraLargeScreen ? 'w-20 h-20' :
                      isLargeScreen ? 'w-16 h-16' : 'w-12 h-12'
                    }`}
                    style={{ imageRendering: 'pixelated' }}
                  />
                ) : (
                  <div className={`flex items-center justify-center bg-gray-200 border-2 border-gray-400 ${
                    isMobilePortrait ? 'w-8 h-8' : 
                    screenSize.isMobile ? 'w-10 h-10' :
                    isExtraLargeScreen ? 'w-20 h-20' :
                    isLargeScreen ? 'w-16 h-16' : 'w-12 h-12'
                  }`} style={{ borderStyle: 'inset' }}>
                    <span className={`text-gray-600 ${
                      isMobilePortrait ? 'text-[6px]' : 
                      screenSize.isMobile ? 'text-[8px]' :
                      isExtraLargeScreen ? 'text-sm' :
                      isLargeScreen ? 'text-xs' : 'text-[10px]'
                    }`}>None</span>
                  </div>
                )}
              </div>

              {/* Main Content - Responsive Layout with scroll */}
              <div className={`flex-1 flex min-h-0 ${
                isMobilePortrait ? 'flex-col space-y-2' : 
                isMobileLandscape ? 'flex-col space-y-1' : 
                screenSize.isMobile ? 'flex-col space-y-2' : 
                isLargeScreen ? 'space-x-6' : 'space-x-4'
              }`}>
                {/* Video Section */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className={`border-2 border-gray-400 flex-1 flex flex-col min-h-0 ${
                    isLargeScreen ? 'p-4' : 
                    isMobileLandscape ? 'p-1' : 'p-2'
                  }`} style={{ borderStyle: 'outset' }}>
                    <div className={`font-bold ${
                      isMobilePortrait ? 'mb-2 text-[11px]' : 
                      screenSize.isMobile ? 'mb-2 text-xs' : 
                      isLargeScreen ? 'mb-3 text-sm' : 'mb-2 text-xs'
                    }`}>Video</div>
                    <div 
                      className={`bg-white border-2 border-gray-400 focus:outline-dotted focus:outline-1 focus:outline-black overflow-y-auto flex-1 min-h-0 ${
                        isMobilePortrait ? 'min-h-[120px]' : 
                        isMobileLandscape ? 'min-h-[80px]' :
                        screenSize.isMobile ? 'min-h-[100px]' :
                        'min-h-[150px]'
                      }`}
                      style={{ borderStyle: 'inset' }}
                      tabIndex={0}
                    >
                      {videoOptions.map((video, index) => (
                        <div
                          key={video}
                          className={`px-2 py-0.5 cursor-pointer ${
                            selectedVideo === video 
                              ? 'bg-[#0000ff] text-white' 
                              : 'hover:bg-gray-100'
                          } ${
                            isMobilePortrait ? 'text-[11px]' : 
                            screenSize.isMobile ? 'text-[10px]' :
                            isLargeScreen ? 'text-sm' : 'text-xs'
                          }`}
                          style={{ 
                            minHeight: screenSize.isTouchDevice ? '28px' : 'auto',
                            touchAction: 'manipulation' 
                          }}
                          onClick={() => handleVideoSelect(video)}
                          onDoubleClick={() => handleVideoDoubleClick(video)}
                        >
                          {video}
                        </div>
                      ))}
                    </div>
                    <button 
                      className={`bg-gray-300 border-2 border-gray-500 text-gray-500 cursor-not-allowed flex-shrink-0 ${
                        isMobilePortrait ? 'mt-2 px-2 py-1 text-[10px] w-full' : 
                        isMobileLandscape ? 'mt-1 px-2 py-0.5 text-[9px]' :
                        screenSize.isMobile ? 'mt-2 px-2 py-1 text-[10px]' : 
                        isLargeScreen ? 'mt-4 px-4 py-2 text-sm' : 'mt-2 px-2 py-1 text-xs'
                      }`}
                      style={{ 
                        borderStyle: 'inset',
                        minHeight: screenSize.isTouchDevice ? 
                                  (isMobileLandscape ? '28px' : '32px') : 'auto'
                      }}
                      disabled
                    >
                      Edit Video...
                    </button>
                  </div>
                </div>

                {/* Wallpaper Section */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className={`border-2 border-gray-400 flex-1 flex flex-col min-h-0 ${
                    isLargeScreen ? 'p-4' : 
                    isMobileLandscape ? 'p-1' : 'p-2'
                  }`} style={{ borderStyle: 'outset' }}>
                    <div className={`font-bold ${
                      isMobilePortrait ? 'mb-2 text-[11px]' : 
                      screenSize.isMobile ? 'mb-2 text-xs' : 
                      isLargeScreen ? 'mb-3 text-sm' : 'mb-2 text-xs'
                    }`}>Wallpaper</div>
                    <div 
                      className={`bg-white border-2 border-gray-400 overflow-y-auto flex-1 min-h-0 ${
                        isMobilePortrait ? 'min-h-[120px]' : 
                        isMobileLandscape ? 'min-h-[80px]' :
                        screenSize.isMobile ? 'min-h-[100px]' :
                        'min-h-[150px]'
                      }`}
                      style={{ borderStyle: 'inset' }}
                    >
                      {backgrounds.map((bg) => (
                        <div
                          key={bg.id}
                          className={`px-2 py-0.5 cursor-pointer ${
                            tempBackground === bg.id && tempVideo === '(None)'
                              ? 'bg-[#0000ff] text-white' 
                              : 'hover:bg-gray-100'
                          } ${
                            isMobilePortrait ? 'text-[11px]' : 
                            screenSize.isMobile ? 'text-[10px]' :
                            isLargeScreen ? 'text-sm' : 'text-xs'
                          }`}
                          style={{ 
                            minHeight: screenSize.isTouchDevice ? '28px' : 'auto',
                            touchAction: 'manipulation' 
                          }}
                          onClick={() => handleWallpaperSelect(bg.id)}
                          onDoubleClick={() => handleWallpaperDoubleClick(bg.id)}
                        >
                          {bg.name}
                        </div>
                      ))}
                    </div>
                    <button 
                      className={`bg-[#c0c0c0] border-2 border-gray-400 hover:bg-gray-200 flex-shrink-0 ${
                        isMobilePortrait ? 'mt-2 px-2 py-1 text-[10px] w-full' : 
                        isMobileLandscape ? 'mt-1 px-2 py-0.5 text-[9px]' :
                        screenSize.isMobile ? 'mt-2 px-2 py-1 text-[10px]' : 
                        isLargeScreen ? 'mt-4 px-4 py-2 text-sm' : 'mt-2 px-2 py-1 text-xs'
                      }`}
                      style={{ 
                        borderStyle: 'outset',
                        minHeight: screenSize.isTouchDevice ? 
                                  (isMobileLandscape ? '28px' : '32px') : 'auto'
                      }}
                      onClick={() => sounds.playClick()}
                    >
                      Browse...
                    </button>
                    
                    {/* Display Options - Hidden on mobile portrait, simplified on mobile landscape */}
                    {!isMobilePortrait && !screenSize.isMobile && (
                      <div className={`flex-shrink-0 ${isLargeScreen ? 'mt-6' : 'mt-3'}`}>
                        <div className={`${
                          isLargeScreen ? 'mb-2 text-sm' : 'mb-1 text-xs'
                        }`}>Display:</div>
                        <div className={isLargeScreen ? 'space-y-2' : 'space-y-1'}>
                            <label className={`flex items-center cursor-pointer ${
                              isLargeScreen ? 'text-sm' : 'text-xs'
                            }`}>
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
                            <label className={`flex items-center cursor-pointer ${
                              isLargeScreen ? 'text-sm' : 'text-xs'
                            }`}>
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {activeTab !== 'Background' && (
            <div className="flex items-center justify-center flex-1 min-h-[300px]">
              <div className="text-center text-gray-600">
                <div className={`mb-2 ${screenSize.isMobile ? 'text-sm' : 'text-sm'}`}>{activeTab}</div>
                <div className={screenSize.isMobile ? 'text-xs' : 'text-xs'}>Settings not implemented</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons - Fixed Footer */}
      <div className={`bg-[#c0c0c0] flex justify-end border-t border-gray-400 flex-shrink-0 ${
        isMobilePortrait ? 'p-2 space-x-1 flex-wrap gap-1' : 
        isMobileLandscape ? 'px-2 py-1 space-x-1' :
        screenSize.isMobile ? 'p-2 space-x-1' : 'p-2 space-x-2'
      }`}>
        <button 
          className={`bg-[#c0c0c0] border-2 border-gray-400 hover:bg-gray-200 ${
            isMobilePortrait ? 'px-2 py-1 text-[11px] flex-1 min-w-0' :
            isMobileLandscape ? 'px-2 py-0.5 text-[9px]' :
            screenSize.isMobile ? 'px-3 py-1 text-[10px]' : 
            isLargeScreen ? 'px-8 py-2 text-sm' : 'px-6 py-1 text-xs'
          }`}
          style={{ 
            borderStyle: 'outset',
            borderColor: '#000000 #c0c0c0 #c0c0c0 #000000',
            borderWidth: '2px',
            minWidth: screenSize.isMobile ? 
                     (isMobileLandscape ? '50px' : '60px') : 'auto',
            minHeight: screenSize.isTouchDevice ? 
                      (isMobileLandscape ? '30px' : '36px') : 'auto'
          }}
          onClick={handleOK}
        >
          <u>O</u>K
        </button>
        <button 
          className={`bg-[#c0c0c0] border-2 border-gray-400 hover:bg-gray-200 ${
            isMobilePortrait ? 'px-2 py-1 text-[11px] flex-1 min-w-0' :
            isMobileLandscape ? 'px-2 py-0.5 text-[9px]' :
            screenSize.isMobile ? 'px-3 py-1 text-[10px]' : 
            isLargeScreen ? 'px-8 py-2 text-sm' : 'px-6 py-1 text-xs'
          }`}
          style={{ 
            borderStyle: 'outset',
            minWidth: screenSize.isMobile ? 
                     (isMobileLandscape ? '50px' : '60px') : 'auto',
            minHeight: screenSize.isTouchDevice ? 
                      (isMobileLandscape ? '30px' : '36px') : 'auto'
          }}
          onClick={handleCancel}
        >
          <u>C</u>ancel
        </button>
        <button 
          className={`${
            hasChanges 
              ? 'bg-[#c0c0c0] border-2 border-gray-400 hover:bg-gray-200 cursor-pointer' 
              : 'bg-gray-300 border-2 border-gray-500 text-gray-500 cursor-not-allowed'
          } ${
            isMobilePortrait ? 'px-2 py-1 text-[11px] flex-1 min-w-0' :
            isMobileLandscape ? 'px-2 py-0.5 text-[9px]' :
            screenSize.isMobile ? 'px-3 py-1 text-[10px]' : 
            isLargeScreen ? 'px-8 py-2 text-sm' : 'px-6 py-1 text-xs'
          }`}
          style={{ 
            borderStyle: hasChanges ? 'outset' : 'inset',
            minWidth: screenSize.isMobile ? 
                     (isMobileLandscape ? '50px' : '60px') : 'auto',
            minHeight: screenSize.isTouchDevice ? 
                      (isMobileLandscape ? '30px' : '36px') : 'auto'
          }}
          disabled={!hasChanges}
          onClick={hasChanges ? handleApply : undefined}
        >
          <u>A</u>pply
        </button>
      </div>
    </div>
  );
};