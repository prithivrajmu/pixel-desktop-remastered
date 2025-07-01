import React, { useState } from 'react';
import { useSounds } from './SoundManager';
import { useScreenSize } from '../hooks/use-mobile';

interface PropertiesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  iconData: {
    id: string;
    name: string;
    icon: string;
    tooltip: string;
    type?: string;
    size?: string;
    location?: string;
    created?: string;
    modified?: string;
    description?: string;
    quote?: string;
  };
}

export const PropertiesDialog: React.FC<PropertiesDialogProps> = ({
  isOpen,
  onClose,
  iconData
}) => {
  const [activeTab, setActiveTab] = useState('description');
  const sounds = useSounds();
  const screenSize = useScreenSize();

  if (!isOpen) return null;

  const handleClose = () => {
    sounds.playClick();
    onClose();
  };

  const handleTabClick = (tab: string) => {
    sounds.playClick();
    setActiveTab(tab);
  };

  const getIconDescription = (id: string) => {
    const descriptions: Record<string, { description: string; quote: string }> = {
      'my-computer': {
        description: "Your gateway to exploring my professional identity! This is where you'll find my skills, experience, and the digital essence of who I am as a tech professional. Think of it as the BIOS of my career - all the essential information you need to understand my capabilities.",
        quote: "\"The computer was born to solve problems that did not exist before.\" - Bill Gates"
      },
      'my-documents': {
        description: "A curated collection of my professional projects, experiences, and digital artifacts. Like a well-organized filing cabinet, but way cooler and with more pixels! Each folder contains stories of innovation, problem-solving, and the occasional debugging marathon.",
        quote: "\"The best way to predict the future is to create it.\" - Peter Drucker"
      },
      'recycle-bin': {
        description: "Not your typical trash can! This is where I keep archived projects, experimental ideas, and concepts that might see the light of day again. Sometimes the best innovations come from revisiting what we once discarded.",
        quote: "\"Failure is simply the opportunity to begin again, this time more intelligently.\" - Henry Ford"
      },
      'the-internet': {
        description: "Your portal to my thoughts, writings, and digital presence across the web. Navigate through my blog posts, articles, and online contributions. Warning: May contain traces of caffeine-fueled coding insights!",
        quote: "\"The Internet is becoming the town square for the global village of tomorrow.\" - Bill Gates"
      },
      'set-up-the-microsoft-network': {
        description: "Ready to connect? This is your direct line to reach out, collaborate, or just say hello! Whether you're looking to discuss opportunities, share ideas, or debate the best programming language, I'm just a message away.",
        quote: "\"The single biggest problem in communication is the illusion that it has taken place.\" - George Bernard Shaw"
      }
    };

    return descriptions[id] || { 
      description: "A mysterious digital artifact from the Windows 95 era.", 
      quote: "\"In the digital age, the most valuable skill is the ability to learn.\" - Anonymous"
    };
  };

  const { description, quote } = getIconDescription(iconData.id);
  const isMobileLandscape = screenSize.isMobile && screenSize.isLandscape;
  const isMobilePortrait = screenSize.isMobile && !screenSize.isLandscape;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-[#c0c0c0] border-2 border-gray-400 shadow-lg flex flex-col ${
          isMobileLandscape
            ? 'w-[95vw] max-w-[600px] h-[95vh] max-h-[420px]'
            : screenSize.isMobile
              ? 'w-[90vw] max-w-[320px] h-[85vh] max-h-[500px]'
              : 'w-96 max-h-[80vh]'
        }`}
        style={{ 
          borderStyle: 'outset',
          fontFamily: '"MS Sans Serif", sans-serif'
        }}
      >
        {/* Title Bar */}
        <div className="bg-[#000080] text-white px-2 py-0.5 flex items-center justify-between flex-shrink-0" style={{ fontSize: screenSize.isMobile ? '11px' : '12px' }}>
          <div className="flex items-center space-x-1">
            <img 
              src={iconData.icon} 
              alt="" 
              className={screenSize.isMobile ? "w-3 h-3" : "w-4 h-4"}
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="font-normal">{iconData.name} Properties</span>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              className={`bg-[#c0c0c0] border border-gray-400 flex items-center justify-center text-black hover:bg-gray-200 active:bg-gray-300 ${
                screenSize.isMobile ? 'w-3 h-3' : 'w-4 h-4'
              }`}
              style={{ 
                borderStyle: 'outset',
                fontSize: screenSize.isMobile ? '8px' : '9px',
                lineHeight: '1'
              }}
              title="Help"
              onClick={() => sounds.playClick()}
            >
              ?
            </button>
            <button 
              className={`bg-[#c0c0c0] border border-gray-400 flex items-center justify-center text-black hover:bg-gray-200 active:bg-gray-300 font-bold ${
                screenSize.isMobile ? 'w-3 h-3' : 'w-4 h-4'
              }`}
              style={{ 
                borderStyle: 'outset',
                fontSize: screenSize.isMobile ? '9px' : '10px',
                lineHeight: '1'
              }}
              onClick={handleClose}
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#c0c0c0] px-2 pt-2 flex-shrink-0">
          <div className="flex">
            <button
              className={`${screenSize.isMobile ? 'px-3 py-1' : 'px-4 py-1'} border-2 ${
                activeTab === 'description' 
                  ? 'bg-[#c0c0c0] border-gray-400 border-b-[#c0c0c0] -mb-px' 
                  : 'bg-gray-300 border-gray-500'
              }`}
              style={{ 
                borderStyle: activeTab === 'description' ? 'outset' : 'outset',
                borderBottomStyle: activeTab === 'description' ? 'none' : 'outset',
                fontSize: screenSize.isMobile ? '11px' : '12px'
              }}
              onClick={() => handleTabClick('description')}
            >
              Description
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Tab Content */}
          <div className="bg-[#c0c0c0] border-t-2 border-gray-400" style={{ borderTopStyle: 'inset' }}>
            <div className={`${screenSize.isMobile ? 'p-3' : 'p-4'}`}>
              {activeTab === 'description' && (
                <div className={`flex ${isMobileLandscape ? 'flex-row space-x-3' : 'flex-col space-y-3'}`}>
                  {/* Left Column (or full width on portrait) */}
                  <div className={`${isMobileLandscape ? 'w-1/2' : 'w-full'} flex flex-col space-y-3`}>
                    {/* Icon and Basic Info */}
                    <div className="flex items-start space-x-3 flex-shrink-0">
                      <img 
                        src={iconData.icon} 
                        alt={iconData.name}
                        className={screenSize.isMobile ? "w-7 h-7" : "w-8 h-8"}
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="flex-1">
                        <div className="font-bold mb-1" style={{ fontSize: screenSize.isMobile ? '12px' : '13px' }}>{iconData.name}</div>
                        <div className="text-gray-600" style={{ fontSize: screenSize.isMobile ? '10px' : '11px' }}>{iconData.tooltip}</div>
                      </div>
                    </div>
                    
                    {isMobileLandscape && <div className="border-t border-gray-400 flex-shrink-0" style={{ borderTopStyle: 'inset' }}></div>}

                    {/* Description */}
                    <div className={`flex flex-col ${isMobileLandscape ? 'flex-1 min-h-0' : ''}`}>
                      <div className="font-bold mb-2 flex-shrink-0" style={{ fontSize: screenSize.isMobile ? '10px' : '11px' }}>Description:</div>
                      <div className={`leading-relaxed bg-white border border-gray-400 p-2 ${
                        isMobileLandscape 
                          ? 'flex-1 min-h-0 overflow-y-auto min-h-[80px]' 
                          : isMobilePortrait 
                          ? 'min-h-[100px]' 
                          : ''
                      }`} style={{ borderStyle: 'inset', fontSize: screenSize.isMobile ? '10px' : '11px' }}>
                        {description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Separator for portrait mode */}
                  {!isMobileLandscape && <div className="border-t border-gray-400 flex-shrink-0" style={{ borderTopStyle: 'inset' }}></div>}

                  {/* Right Column (or full width on portrait) */}
                  <div className={`${isMobileLandscape ? 'w-1/2' : 'w-full'} flex flex-col space-y-3`}>
                    {/* Quote */}
                    <div className={`flex flex-col ${isMobileLandscape ? 'flex-1 min-h-0' : ''}`}>
                      <div className="font-bold mb-2 flex-shrink-0" style={{ fontSize: screenSize.isMobile ? '10px' : '11px' }}>Inspirational Quote:</div>
                      <div className={`italic text-gray-700 bg-gray-100 border border-gray-400 p-2 ${
                        isMobileLandscape 
                          ? 'flex-1 min-h-0 overflow-y-auto min-h-[60px]' 
                          : isMobilePortrait 
                          ? 'min-h-[80px]' 
                          : ''
                      }`} style={{ borderStyle: 'inset', fontSize: screenSize.isMobile ? '10px' : '11px' }}>
                        {quote}
                      </div>
                    </div>
                    
                    {isMobileLandscape && <div className="border-t border-gray-400 flex-shrink-0" style={{ borderTopStyle: 'inset' }}></div>}

                    {/* Properties */}
                    <div className="flex-shrink-0">
                      <div className="font-bold mb-2" style={{ fontSize: screenSize.isMobile ? '10px' : '11px' }}>Properties:</div>
                      <div className="space-y-1" style={{ fontSize: screenSize.isMobile ? '10px' : '11px' }}>
                        <div className="flex">
                          <span className={`${screenSize.isMobile ? 'w-14' : 'w-16'} text-gray-600`}>Type:</span>
                          <span>Desktop Icon</span>
                        </div>
                        <div className="flex">
                          <span className={`${screenSize.isMobile ? 'w-14' : 'w-16'} text-gray-600`}>Location:</span>
                          <span>Desktop</span>
                        </div>
                        <div className="flex">
                          <span className={`${screenSize.isMobile ? 'w-14' : 'w-16'} text-gray-600`}>Size:</span>
                          <span>32x32 pixels</span>
                        </div>
                        <div className="flex">
                          <span className={`${screenSize.isMobile ? 'w-14' : 'w-16'} text-gray-600`}>Created:</span>
                          <span>Windows 95 Era</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed Footer */}
        <div className={`bg-[#c0c0c0] flex justify-end border-t border-gray-400 flex-shrink-0 ${
          isMobilePortrait ? 'p-2 space-x-1 flex-wrap gap-1' :
          screenSize.isMobile ? 'p-2 space-x-2' : 'p-3 space-x-2'
        }`}>
          <button 
            className={`bg-[#c0c0c0] border-2 border-gray-400 hover:bg-gray-200 active:bg-gray-300 ${
              isMobilePortrait ? 'px-2 py-1 flex-1 min-w-0' :
              screenSize.isMobile ? 'px-3 py-1' : 'px-4 py-1'
            }`}
            style={{ 
              borderStyle: 'outset',
              borderColor: '#000000 #c0c0c0 #c0c0c0 #000000',
              borderWidth: '2px',
              minHeight: screenSize.isMobile ? '28px' : '32px',
              fontSize: screenSize.isMobile ? '11px' : '12px'
            }}
            onClick={handleClose}
          >
            <u>O</u>K
          </button>
          <button 
            className={`bg-[#c0c0c0] border-2 border-gray-400 hover:bg-gray-200 active:bg-gray-300 ${
              isMobilePortrait ? 'px-2 py-1 flex-1 min-w-0' :
              screenSize.isMobile ? 'px-3 py-1' : 'px-4 py-1'
            }`}
            style={{ 
              borderStyle: 'outset',
              minHeight: screenSize.isMobile ? '28px' : '32px',
              fontSize: screenSize.isMobile ? '11px' : '12px'
            }}
            onClick={handleClose}
          >
            <u>C</u>ancel
          </button>
          <button 
            className={`bg-gray-300 border-2 border-gray-500 text-gray-500 cursor-not-allowed ${
              isMobilePortrait ? 'px-2 py-1 flex-1 min-w-0' :
              screenSize.isMobile ? 'px-3 py-1' : 'px-4 py-1'
            }`}
            style={{ 
              borderStyle: 'inset',
              minHeight: screenSize.isMobile ? '28px' : '32px',
              fontSize: screenSize.isMobile ? '11px' : '12px'
            }}
            disabled
          >
            <u>A</u>pply
          </button>
        </div>
      </div>
    </div>
  );
}; 