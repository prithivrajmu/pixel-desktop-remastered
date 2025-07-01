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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-[#c0c0c0] border-2 border-gray-400 shadow-lg ${
          screenSize.isMobile 
            ? (screenSize.isLandscape 
              ? 'w-[85vw] max-w-[500px] max-h-[85vh]' 
              : 'w-[92vw] max-w-[320px] max-h-[75vh]')
            : 'w-96'
        } overflow-y-auto`}
        style={{ 
          borderStyle: 'outset',
          fontFamily: '"MS Sans Serif", sans-serif'
        }}
      >
        {/* Title Bar */}
        <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <img 
              src={iconData.icon} 
              alt="" 
              className="w-4 h-4"
              style={{ imageRendering: 'pixelated' }}
            />
            <span>{iconData.name} Properties</span>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              className={`bg-[#c0c0c0] border border-gray-400 flex items-center justify-center text-black hover:bg-gray-200 ${
                screenSize.isMobile 
                  ? (screenSize.isLandscape ? 'w-3 h-3 text-[8px]' : 'w-4 h-3 text-[9px]')
                  : 'w-4 h-4 text-xs'
              }`}
              style={{ 
                borderStyle: 'outset',
                fontSize: screenSize.isMobile 
                  ? (screenSize.isLandscape ? '7px' : '8px')
                  : '10px'
              }}
              title="Help"
              onClick={() => sounds.playClick()}
            >
              ?
            </button>
            <button 
              className={`bg-[#c0c0c0] border border-gray-400 flex items-center justify-center text-black hover:bg-gray-200 font-bold ${
                screenSize.isMobile 
                  ? (screenSize.isLandscape ? 'w-3 h-3 text-[8px]' : 'w-4 h-3 text-[9px]')
                  : 'w-4 h-4 text-xs'
              }`}
              style={{ 
                borderStyle: 'outset',
                fontSize: screenSize.isMobile 
                  ? (screenSize.isLandscape ? '7px' : '8px')
                  : '10px'
              }}
              onClick={handleClose}
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#c0c0c0] px-2 pt-2">
          <div className="flex">
            <button
              className={`px-4 py-1 text-xs border-2 ${
                activeTab === 'description' 
                  ? 'bg-[#c0c0c0] border-gray-400 border-b-[#c0c0c0] -mb-px' 
                  : 'bg-gray-300 border-gray-500'
              }`}
              style={{ 
                borderStyle: activeTab === 'description' ? 'outset' : 'outset',
                borderBottomStyle: activeTab === 'description' ? 'none' : 'outset'
              }}
              onClick={() => handleTabClick('description')}
            >
              Description
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-[#c0c0c0] p-4 border-t-2 border-gray-400" style={{ borderTopStyle: 'inset' }}>
          {activeTab === 'description' && (
            <div className="space-y-4">
              {/* Icon and Basic Info */}
              <div className="flex items-start space-x-3">
                <img 
                  src={iconData.icon} 
                  alt={iconData.name}
                  className="w-8 h-8"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="flex-1">
                  <div className="text-sm font-bold mb-1">{iconData.name}</div>
                  <div className="text-xs text-gray-600">{iconData.tooltip}</div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-400" style={{ borderTopStyle: 'inset' }}></div>

              {/* Description */}
              <div>
                <div className="text-xs font-bold mb-2">Description:</div>
                <div className="text-xs leading-relaxed mb-3 p-2 bg-white border border-gray-400" style={{ borderStyle: 'inset' }}>
                  {description}
                </div>
              </div>

              {/* Quote */}
              <div>
                <div className="text-xs font-bold mb-2">Inspirational Quote:</div>
                <div className="text-xs italic text-gray-700 p-2 bg-gray-100 border border-gray-400" style={{ borderStyle: 'inset' }}>
                  {quote}
                </div>
              </div>

              {/* Properties */}
              <div>
                <div className="text-xs font-bold mb-2">Properties:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex">
                    <span className="w-16 text-gray-600">Type:</span>
                    <span>Desktop Icon</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-gray-600">Location:</span>
                    <span>Desktop</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-gray-600">Size:</span>
                    <span>32x32 pixels</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-gray-600">Created:</span>
                    <span>Windows 95 Era</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-[#c0c0c0] p-3 flex justify-end space-x-2">
          <button 
            className="px-4 py-1 bg-[#c0c0c0] border-2 border-gray-400 text-xs hover:bg-gray-200"
            style={{ 
              borderStyle: 'outset',
              borderColor: '#000000 #c0c0c0 #c0c0c0 #000000',
              borderWidth: '2px'
            }}
            onClick={handleClose}
          >
            <u>O</u>K
          </button>
          <button 
            className="px-4 py-1 bg-[#c0c0c0] border-2 border-gray-400 text-xs hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
            onClick={handleClose}
          >
            <u>C</u>ancel
          </button>
          <button 
            className="px-4 py-1 bg-gray-300 border-2 border-gray-500 text-xs text-gray-500 cursor-not-allowed"
            style={{ borderStyle: 'inset' }}
            disabled
          >
            <u>A</u>pply
          </button>
        </div>
      </div>
    </div>
  );
}; 