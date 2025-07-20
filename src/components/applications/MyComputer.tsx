import React, { useState } from 'react';
import { downloadResume } from '../../utils/downloadUtils';
import { useScreenSize } from '../../hooks/use-mobile';

export const MyComputer: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Win98');
  const screenSize = useScreenSize();

  const driveIcons = [
    { 
      id: 'floppy', 
      name: '3½ Floppy (A:)', 
      icon: '💾',
      type: 'floppy' 
    },
    { 
      id: 'Win98', 
      name: 'Win98 (C:)', 
      icon: '💻',
      type: 'harddisk',
      selected: true
    },
    { 
      id: 'Storage', 
      name: 'Storage (D:)', 
      icon: '💻',
      type: 'harddisk' 
    },
    { 
      id: 'Wintest', 
      name: 'Wintest (E:)', 
      icon: '💻',
      type: 'harddisk' 
    },
    { 
      id: 'MP3', 
      name: 'MP3 (F:)', 
      icon: '🎵',
      type: 'mp3' 
    },
    { 
      id: 'CDROM1', 
      name: 'CD-ROM (G:)', 
      icon: '💿',
      type: 'cdrom' 
    },
    { 
      id: 'CDROM2', 
      name: 'CD-ROM (H:)', 
      icon: '💿',
      type: 'cdrom' 
    },
  ];

  const systemFolders = [
    { 
      id: 'control', 
      name: 'Control Panel', 
      icon: '⚙️',
      type: 'folder' 
    },
    { 
      id: 'printers', 
      name: 'Printers', 
      icon: '🖨️',
      type: 'folder' 
    },
    { 
      id: 'dialup', 
      name: 'Dial-Up Networking', 
      icon: '📞',
      type: 'folder' 
    },
  ];

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const handleItemDoubleClick = (itemId: string) => {
    // console.log(`Opening ${itemId}`);
  };

  const handleDownloadResume = () => {
    downloadResume();
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif' }}>
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-1">
        <div className="flex text-xs">
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">File</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Edit</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">View</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Help</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] p-1">
        <div className="flex items-center gap-1 mb-1 overflow-x-auto">
          {/* Navigation Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Back"
          >
            ←
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Forward"
          >
            →
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Up"
          >
            ↑
          </button>
          
          <div className={`bg-[#808080] mx-1 ${
            screenSize.isMobile ? 'w-px h-8' : 'w-px h-6'
          }`}></div>
          
          {/* Action Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '12px' : '10px'
            }}
            title="Cut"
          >
            ✂
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '12px' : '10px'
            }}
            title="Copy"
          >
            📋
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '12px' : '10px'
            }}
            title="Paste"
          >
            📄
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '12px' : '10px'
            }}
            title="Undo"
          >
            ↶
          </button>
          
          <div className={`bg-[#808080] mx-1 ${
            screenSize.isMobile ? 'w-px h-8' : 'w-px h-6'
          }`}></div>
          
          {/* View Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Large Icons"
          >
            ⊞
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Small Icons"
          >
            ⊟
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="List"
          >
            ≡
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Details"
          >
            ⋮
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className={screenSize.isMobile ? 'text-xs' : 'text-xs'}>Address:</span>
          <div className={`flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 ${
            screenSize.isMobile ? 'text-xs' : 'text-xs'
          }`} style={{ borderStyle: 'inset' }}>
            <img 
              src="/icons/My Computer.ico" 
              alt="My Computer" 
              className={screenSize.isMobile ? 'w-4 h-4 mr-1' : 'w-4 h-4 mr-1'} 
            />
            <span>My Computer</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-32 h-40 bg-white border-2 border-gray-400 flex items-center justify-center overflow-hidden p-1" style={{ borderStyle: 'inset' }}>
            <img 
              src="/icons/profile_prithiv.png"
              alt="Prithiv Raj M U"
              className="w-full h-full object-contain rounded-sm"
              style={{ 
                imageRendering: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
              onError={(e) => {
                // Fallback to a default icon if image fails to load
                e.currentTarget.src = "/icons/People.ico";
                e.currentTarget.style.imageRendering = 'pixelated';
              }}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">My Defragged Identity</h2>
            <div className="space-y-1 text-xs">
              <p><strong>Name:</strong> Prithiv Raj M U</p>
              <p><strong>Profession:</strong> Engineer & Entrepreneur (E²) | Learning LLMs, Vibe Coding</p>
              <p><strong>Experience:</strong> 9+ Years</p>
              <p><strong>Location:</strong> Chennai, India | San Francisco, USA</p>
              <p><strong>Pronouns:</strong> He/Him</p>
            </div>
            
            {/* Download Resume Button */}
            <div className="mt-3">
              <button 
                onClick={handleDownloadResume}
                className="bg-[#c0c0c0] border-2 border-gray-400 px-4 py-2 text-xs hover:bg-gray-200 active:border-style-inset transition-colors"
                style={{ borderStyle: 'outset' }}
                onMouseDown={(e) => {
                  e.currentTarget.style.borderStyle = 'inset';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.borderStyle = 'outset';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderStyle = 'outset';
                }}
              >
                <img src="/icons/Mail text.ico" alt="Resume" className="w-4 h-4 inline mr-1" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
        

        
        <div className="border-2 border-gray-400 p-3 mb-4" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2">Skills & Technologies</h3>
          <div className="grid grid-cols-2 gap-2 text-xs ">
            <div>
              <p><strong>Languages:</strong></p>
              <p>• Python (NumPy, Pandas, SciPy, PyTorch)</p>
              <p>• SQL, lookml</p>
              <p>• JavaScript/TypeScript</p>
              <p>• C++/C, Java</p>
            </div>
            <div>
              <p><strong>Databases:</strong></p>
              <p>• Snowflake, BigQuery, Postgres, MySQL, MongoDB</p>
              <p>• Data Warehousing, ETL/ELT Architecture</p>  
            </div>
            <div>
              <p><strong>Frameworks & Tools:</strong></p>
              <p>• React, Flask, Next.js, Tailwind CSS, Bootstrap</p>
              <p>• Looker, Tableau, Power BI, dbt, Databricks</p>
              <p>• Docker, Kubernetes, AWS, GCP, Git,</p>
            </div>
            <div>
              <p><strong>Expertise:</strong></p>
              <p>• Team Building, Leadership, Product Management</p>           
              <p>• Data Science, Machine Learning, LLMs, Operations Research</p>
              <p>• Simulation Systems - Agentic, Monte Carlo, Event Based</p>
              <p>• Full-Stack Web Development, SEO</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-400 p-3" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2">About</h3>
          <p className="text-xs leading-relaxed">
            A output-driven person with over 9 years of experience spanning high-growth startups and successful entrepreneurial ventures.
            Proven ability to build and lead high-performing teams, architect complex data solutions from the ground up, and drive business
            modernization. Combines deep expertise in data science, analytics, and agent-based simulation with a founder's mindset for product
            development, operational efficiency, and P&L responsibility.
            <br />
            <br />
            TLDR:
            <br />
            I am a data scientist, engineer, and entrepreneur. Passion for building products and services that
            help people live better lives. I am a quick learner and a problem solver.
          </p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 mr-2" style={{ borderStyle: 'inset' }}>
            1 object(s) selected
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5" style={{ borderStyle: 'inset' }}>
            Free Space: 6.04GB, Capacity: 6.99GB
          </div>
        </div>
      </div>
    </div>
  );
};