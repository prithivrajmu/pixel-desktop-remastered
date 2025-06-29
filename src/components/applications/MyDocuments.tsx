import React, { useState } from 'react';
import { downloadResume } from '../../utils/downloadUtils';

interface Project {
  name: string;
  icon: string;
  description: string;
  tech: string[];
  status: 'current' | 'completed';
  details?: {
    duration: string;
    achievements: string[];
    responsibilities: string[];
  };
}

interface DocumentFile {
  name: string;
  icon: string;
  type: string;
  onClick: () => void;
}

export const MyDocuments: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      name: 'A M Foods - Director',
      icon: '🍲',
      description: 'Driving modernization and operational efficiency for a legacy restaurant brand (est. 1973). Architected custom inventory & payroll software.',
      tech: ['Business Leadership', 'Software Dev', 'Digital Transformation', 'Data-Driven Inventory'],
      status: 'current',
      details: {
        duration: '2023 - Present',
        achievements: [
          'Reduced operational costs by 25% through digital transformation initiatives',
          'Architected custom inventory management system reducing waste by 30%',
          'Implemented data-driven decision making across all business operations',
          'Led successful modernization of 50-year-old business processes'
        ],
        responsibilities: [
          'Strategic planning and business modernization',
          'Software architecture and development oversight',
          'Team leadership and cross-functional collaboration',
          'P&L responsibility and operational efficiency optimization'
        ]
      }
    },
    {
      name: 'Nalam Properties - Founder',
      icon: '🏠',
      description: 'Launched a real estate venture (nalamproperties.com). Built a proprietary website and lead management system from the ground up.',
      tech: ['Entrepreneurship', 'Full-Stack Dev', 'SEO', 'Agent-Based Simulation'],
      status: 'current',
      details: {
        duration: '2023 - Present',
        achievements: [
          'Successfully launched real estate platform with custom lead management',
          'Achieved 40% conversion rate improvement through data analytics',
          'Built proprietary agent-based simulation models for market analysis',
          'Established strong SEO presence with 200% organic traffic growth'
        ],
        responsibilities: [
          'Full-stack web development and architecture',
          'Business strategy and market analysis',
          'SEO optimization and digital marketing',
          'Customer relationship management and sales optimization'
        ]
      }
    },
    {
      name: 'Zipline - Sr. Data Analyst',
      icon: '✈️',
      description: 'Managed software/data teams to build operational tools. Reduced aircraft manufacturing costs by 15% and improved efficiency by 25%.',
      tech: ['ETL', 'Docker', 'Sisense', 'Tableau', 'Hypothesis Testing', 'Process Improvement'],
      status: 'completed',
      details: {
        duration: '2021 - 2023',
        achievements: [
          'Reduced aircraft manufacturing costs by 15% through data-driven optimization',
          'Improved operational efficiency by 25% via automated reporting systems',
          'Led cross-functional team of 8 engineers and analysts',
          'Deployed scalable ETL pipelines processing 10M+ daily events'
        ],
        responsibilities: [
          'Data architecture and ETL pipeline development',
          'Team leadership and project management',
          'Business intelligence and reporting dashboard creation',
          'Statistical analysis and hypothesis testing for operational improvements'
        ]
      }
    },
    {
      name: 'Volansi - Lead Data Eng.',
      icon: '🚁',
      description: 'Led data team for drone manufacturing & delivery. Developed hub-and-spoke network models to optimize fleet operations.',
      tech: ['Python', 'Scipy', 'OpenCV', 'SQL', 'Team Leadership', 'Agile'],
      status: 'completed',
      details: {
        duration: '2019 - 2021',
        achievements: [
          'Architected scalable data infrastructure supporting 100+ daily flights',
          'Developed hub-and-spoke optimization models reducing delivery time by 30%',
          'Led team of 5 data engineers in agile development environment',
          'Implemented computer vision systems for autonomous flight operations'
        ],
        responsibilities: [
          'Data engineering team leadership and mentoring',
          'Scalable data pipeline architecture and implementation',
          'Operations research and network optimization modeling',
          'Computer vision and machine learning system development'
        ]
      }
    }
  ];

  const documentFiles: DocumentFile[] = [
    {
      name: 'Resume.odf',
      icon: '/icons/Mail text.ico',
      type: 'OpenDocument Text',
      onClick: downloadResume
    },
    {
      name: 'Portfolio.ppt',
      icon: '/icons/Constructor.ico',
      type: 'PowerPoint Presentation',
      onClick: () => setSelectedProject({ 
        name: 'Portfolio', 
        icon: '💻', 
        description: 'Coming Soon', 
        tech: [], 
        status: 'current' as const 
      })
    }
  ];

  const handleProjectClick = (project: Project) => {
    if (project.name === 'Portfolio') {
      // Show coming soon page
      setSelectedProject(project);
    } else {
      // Show project details
      setSelectedProject(project);
    }
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-700';
      case 'completed': return 'text-blue-700';
      default: return 'text-black';
    }
  };

  // Portfolio Coming Soon Page (Windows 95 Error Style)
  if (selectedProject?.name === 'Portfolio') {
    return (
      <div className="h-full w-full bg-[#0000aa] text-white flex flex-col" style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif' }}>
        {/* Title Bar */}
        <div className="bg-[#008080] text-center py-1 text-sm font-bold">
          Portfolio
        </div>
        
        {/* Error Content */}
        <div className="flex-1 flex flex-col justify-center items-start px-8 py-6">
          <div className="mb-6">
            <p className="text-lg mb-4">A page fault has occurred. To continue:</p>
            <p className="mb-2">Press ENTER to return to My Documents, or</p>
            <p className="mb-6">Press CTRL+ALT+DEL to visit my GitHub portfolio. If you do this,</p>
            <p className="mb-6">you will see my actual projects and code samples.</p>
            <p className="mb-6">Error: 0E : 016F : BFF9B3D4</p>
            <p className="mb-4">Press any key to continue _</p>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={handleBackClick}
              className="bg-[#c0c0c0] text-black px-4 py-2 border-2 border-gray-300 hover:bg-gray-200"
              style={{ borderStyle: 'outset' }}
            >
              ← Back to My Documents
            </button>
                         <button 
               onClick={() => window.open('https://github.com/prithivraj', '_blank', 'noopener,noreferrer')}
               className="bg-[#c0c0c0] text-black px-4 py-2 border-2 border-gray-300 hover:bg-gray-200"
               style={{ borderStyle: 'outset' }}
             >
              💻 Visit GitHub Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Project Details View
  if (selectedProject && selectedProject.name !== 'Portfolio') {
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
          <div className="flex items-center gap-1">
            <button 
              onClick={handleBackClick}
              className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
              style={{ borderStyle: 'outset' }}
              title="Back to My Documents"
            >
              ←
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-6 overflow-auto">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">{selectedProject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold mb-2">{selectedProject.name}</h1>
              <div className={`text-sm font-bold ${getStatusColor(selectedProject.status)} mb-2`}>
                {selectedProject.status.toUpperCase()} • {selectedProject.details?.duration}
              </div>
              <p className="text-sm text-gray-700">{selectedProject.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-400 p-4" style={{ borderStyle: 'inset' }}>
              <h3 className="font-bold mb-3 text-lg">Key Achievements</h3>
              <ul className="text-sm space-y-2">
                {selectedProject.details?.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-gray-400 p-4" style={{ borderStyle: 'inset' }}>
              <h3 className="font-bold mb-3 text-lg">Responsibilities</h3>
              <ul className="text-sm space-y-2">
                {selectedProject.details?.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 border-2 border-gray-400 p-4" style={{ borderStyle: 'inset' }}>
            <h3 className="font-bold mb-3 text-lg">Technologies & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((tech, index) => (
                <span 
                  key={index} 
                  className="bg-[#c0c0c0] border border-gray-400 px-3 py-1 text-xs"
                  style={{ borderStyle: 'outset' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 text-xs">
          Project Details - {selectedProject.name}
        </div>
      </div>
    );
  }

  // Main My Documents View
  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif' }}>
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-1">
        <div className="flex text-xs">
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">File</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Edit</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">View</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Tools</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Help</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] p-1">
        <div className="flex items-center gap-1 mb-1">
          {/* Navigation Buttons */}
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Back"
          >
            ←
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Forward"
          >
            →
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Up"
          >
            ↑
          </button>
          
          <div className="w-px h-6 bg-[#808080] mx-1"></div>
          
          {/* Action Buttons */}
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Cut"
          >
            ✂
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Copy"
          >
            📋
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Paste"
          >
            📄
          </button>
          
          <div className="w-px h-6 bg-[#808080] mx-1"></div>
          
          {/* View Buttons */}
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Large Icons"
          >
            ⊞
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Details"
          >
            ⋮
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className="text-xs">Address:</span>
          <div className="flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 text-xs" style={{ borderStyle: 'inset' }}>
            <img src="/icons/Documents Folder.ico" alt="My Documents" className="w-4 h-4 mr-1" />
            <span>My Documents</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        {/* Document Files Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Document Files</h2>
          <div className="text-xs text-gray-600 mb-3">
            Double-click a document to open/download
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            {documentFiles.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 cursor-pointer hover:bg-gray-100 rounded border-2 border-transparent hover:border-gray-300 transition-colors"
                onDoubleClick={file.onClick}
                title={`${file.name} - ${file.type}`}
              >
                <div className="mb-2">
                  {file.icon.startsWith('/icons/') ? (
                    <img src={file.icon} alt={file.name} className="w-8 h-8 mx-auto" />
                  ) : (
                    <div className="text-3xl">{file.icon}</div>
                  )}
                </div>
                <div className="text-xs text-center">
                  <div className="font-semibold">{file.name}</div>
                  <div className="text-gray-600 text-[10px]">{file.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">My Experience</h2>
          <div className="text-xs text-gray-600">
            Click on any experience to view detailed information
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-300 border-2 border-gray-400 p-3 cursor-pointer hover:bg-gray-250 transition-colors"
              style={{ borderStyle: 'outset' }}
              onClick={() => handleProjectClick(project)}
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
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{project.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{project.name}</h3>
                  <div className={`text-xs font-bold ${getStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </div>
                </div>
              </div>
              <p className="text-xs mb-2 leading-relaxed">{project.description}</p>
              <div className="text-xs">
                <strong>Skills:</strong> {project.tech.join(', ')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-2 border-gray-400 p-3" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2">Quick Access</h3>
          <div className="flex space-x-4 text-xs">
            <button 
              onClick={downloadResume}
              className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" 
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
            <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
              <a href="https://linkedin.com/in/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">🔗 LinkedIn</a>
            </button>
            <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
              <a href="https://github.com/prithivraj" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">💻 GitHub</a>
            </button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 mr-2" style={{ borderStyle: 'inset' }}>
            {documentFiles.length + projects.length} object(s)
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5" style={{ borderStyle: 'inset' }}>
            {projects.filter(p => p.status === 'current').length} active, {projects.filter(p => p.status === 'completed').length} completed
          </div>
        </div>
      </div>
    </div>
  );
};