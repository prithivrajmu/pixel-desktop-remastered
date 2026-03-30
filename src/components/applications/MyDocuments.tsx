import React, { useState } from 'react';
import { useScreenSize } from '../../hooks/use-mobile';

interface Project {
  name: string;
  icon: string;
  description: string;
  tech: string[];
  status: 'current' | 'completed';
  url?: string;
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
  const screenSize = useScreenSize();

  const projects: Project[] = [
    {
      name: 'Headwind Labs - Technical Lead Engineer',
      icon: '🚀',
      description: 'Leading architecture and delivery across internal products, operational data systems, and AI-assisted applications.',
      tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RAG', 'OpenAI', 'Gemini'],
      status: 'current',
      details: {
        duration: 'March 2023 - Present',
        achievements: [
          'Architected and built Kattru, a learning platform with retrieval-backed course generation and secure key handling.',
          'Delivered Zippy Bee, a proprietary CRM used to manage the full lead-to-close pipeline with role-based access and reporting.',
          'Built Inventree Sync, an inventory and payroll system that replaced spreadsheet-based operations.',
          'Designed data flows that connected operations with reporting, forecasting, and day-to-day decision support.'
        ],
        responsibilities: [
          'Application and data architecture',
          'Full-stack delivery',
          'Access control and workflow design',
          'Business systems modernization'
        ]
      }
    },
    {
      name: 'Volansi - Lead Data Analytics and Engineering',
      icon: '🚁',
      description: 'Built and led a data function supporting drone engineering, manufacturing, network planning, and commercial analysis.',
      tech: ['Python', 'SQL', 'SciPy', 'SimPy', 'Machine Learning', 'Team Leadership'],
      status: 'completed',
      details: {
        duration: 'Sept 2021 - Jan 2023',
        achievements: [
          'Hired and managed the data team and set delivery direction across analytics and data engineering work.',
          'Led modeling programs for hub-and-spoke delivery design, survival analysis, and network feasibility.',
          'Built simulation and optimization tools used by engineering, operations, and sales teams.',
          'Ran agile planning and roadmaps across data engineering and analytics initiatives.'
        ],
        responsibilities: [
          'Team leadership and stakeholder management',
          'Operations research and simulation',
          'Decision support for network planning',
          'Roadmap ownership'
        ]
      }
    },
    {
      name: 'Mashey - Sr Analytics Consultant/Engineer',
      icon: '💻',
      description: 'Led a warehouse modernization program for an e-commerce client, moving the stack from ETL to ELT and tightening governance.',
      tech: ['dbt', 'Snowflake', 'BigQuery', 'SQL', 'ELT', 'Data Governance'],
      status: 'completed',
      details: {
        duration: 'June 2021 - Sept 2021',
        achievements: [
          'Led the migration from BigQuery to Snowflake and introduced dbt-based transformation workflows.',
          'Defined warehouse controls aligned to GDPR and CCPA requirements.',
          'Used cohort and commercial analysis to support go-to-market and margin decisions.',
          'Contributed to quarterly savings by identifying product and shipping cost opportunities.'
        ],
        responsibilities: [
          'Warehouse architecture and migration planning',
          'Transformation design with dbt',
          'Governance and compliance',
          'Commercial analytics'
        ]
      }
    },
    {
      name: 'Zipline International - Senior Data Analyst',
      icon: '✈️',
      description: 'Built internal tools and analysis workflows for operations teams running high-volume logistics across multiple countries.',
      tech: ['Python', 'SQL', 'Sisense', 'Tableau', 'Microservices', 'Experimentation'],
      status: 'completed',
      details: {
        duration: 'June 2019 - May 2021',
        achievements: [
          'Delivered software and data projects used by operations teams in the US, Ghana, and Rwanda.',
          'Helped drive measurable gains in operating efficiency and site throughput.',
          'Supported teams with ad hoc analysis, dashboards, and lightweight internal applications.',
          'Contributed to anomaly detection work that reduced aircraft manufacturing cost per unit.'
        ],
        responsibilities: [
          'Operational analytics and tooling',
          'Cross-functional project delivery',
          'Dashboarding and reporting',
          'Statistical analysis for operations'
        ]
      }
    },
    {
      name: 'NEXTOR II (FAA Consortium) - Data Scientist',
      icon: '🛰️',
      description: 'Built simulation models for aviation operations research with applications for the FAA, airports, and airlines.',
      tech: ['Python', 'Simulation', 'Queuing Theory', 'Operations Research', 'Aviation Analytics'],
      status: 'completed',
      details: {
        duration: 'Aug 2016 - Jan 2019',
        achievements: [
          'Developed simulation models of US airspace for post-operations evaluation.',
          'Built queuing models to quantify operational capacity for the Detroit Metro Airport expansion plan.'
        ],
        responsibilities: [
          'Simulation model development',
          'Operations research and queuing analysis',
          'Decision support for aviation stakeholders'
        ]
      }
    },
    {
      name: 'PDF Miner - PDF Data Extraction Platform',
      icon: '📄',
      description: 'A document extraction tool with multiple backends, batch workflows, and packaging for reuse.',
      tech: ['Python', 'Streamlit', 'OCR', 'CI/CD'],
      status: 'completed',
      url: 'https://github.com/prithivrajmu/extract-data-from-pdf/',
      details: {
        duration: '2024',
        achievements: [
          'Built a unified service layer for multiple extraction backends.',
          'Delivered batch processing, structured field extraction, and export workflows.',
          'Improved local OCR performance through CPU/GPU-aware execution paths.',
          'Published the project as a reusable Python package with testing and CI.'
        ],
        responsibilities: [
          'Python application architecture',
          'Document-processing workflow design',
          'Packaging, testing, and release setup'
        ]
      }
    }
  ];

  const documentFiles: DocumentFile[] = [
    {
      name: 'Resume',
      icon: '/icons/WordPad document (small).ICO',
      type: 'pdf',
      onClick: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer')
    },
    {
      name: 'Blog',
      icon: '/icons/SMALL.ico',
      type: 'web',
      onClick: () => {
        window.location.href = '/blog';
      }
    },
    {
      name: 'Inventree Sync',
      icon: '/icons/inventreesync.svg',
      type: 'app',
      onClick: () => window.open('https://inventreesync.com', '_blank', 'noopener,noreferrer')
    },
    {
      name: 'The Urban Pinnal',
      icon: '/icons/theurbanpinnal.ico',
      type: 'app',
      onClick: () => window.open('https://theurbanpinnal.com', '_blank', 'noopener,noreferrer')
    },
    {
      name: 'GitHub',
      icon: '/icons/Constructor.ico',
      type: 'website',
      onClick: () => window.open('https://github.com/prithivrajmu', '_blank', 'noopener,noreferrer')
    }
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
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

  // Project Details View
  if (selectedProject) {
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
          <div className="flex items-center gap-1 overflow-x-auto">
            <button 
              onClick={handleBackClick}
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

          {selectedProject.url && (
            <div className="mt-6 border-2 border-gray-400 p-4" style={{ borderStyle: 'inset' }}>
              <h3 className="font-bold mb-3 text-lg">Project Link</h3>
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline hover:text-blue-900 text-sm break-all"
              >
                {selectedProject.url}
              </a>
            </div>
          )}
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
            title="Back to My Documents"
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
              src="/icons/Documents Folder.ico" 
              alt="My Documents" 
              className={screenSize.isMobile ? 'w-4 h-4 mr-1' : 'w-4 h-4 mr-1'} 
            />
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
            Double-click a document to open the real file or destination
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
          <div className="flex flex-wrap gap-2 text-xs">
            <button 
              onClick={() => window.open('https://inventreesync.com', '_blank', 'noopener,noreferrer')}
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
              title="Visit Inventree Sync Application"
            >
              <img src="/icons/inventreesync.svg" alt="Inventree Sync" className="w-4 h-4 inline mr-1" />
              Launch Inventree Sync
            </button>
            <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
              <a href="https://linkedin.com/in/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">🔗 LinkedIn</a>
            </button>
            <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
              <a href="https://github.com/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">💻 GitHub</a>
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
