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
      description: 'Building AI-powered learning platform (Kattru), proprietary CRM (Zippy Bee), and custom inventory management system (Inventree Sync) to solve real-world business problems.',
      tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'OpenAI', 'Gemini', 'LangChain', 'RAG', 'Serverless'],
      status: 'current',
      details: {
        duration: 'March 2023 - Present',
        achievements: [
          'Built Kattru, AI-powered learning platform with RAG-based course generation, encrypted API key management, and serverless architecture supporting OpenAI/Gemini models',
          'Engineered and deployed Zippy Bee, a proprietary full-stack CRM (React, TypeScript, Supabase) to manage entire business pipeline from lead to close',
          'Designed system modules for lead/client management, project tracking, and agent analytics with role-based access and data security (RLS)',
          'Architected and built Inventree Sync, custom inventory and payroll management system replacing manual Google Sheets, significantly reducing waste and manual errors',
          'Engineered data-driven inventory control system, optimizing stock levels based on sales velocity and supplier lead times'
        ],
        responsibilities: [
          'Full-stack software architecture and development',
          'AI/ML integration and RAG implementation',
          'Database design with Row-Level Security policies',
          'Serverless Edge Functions development',
          'Business problem-solving through custom software solutions'
        ]
      }
    },
    {
      name: 'Volansi - Lead Data Analytics and Engineering',
      icon: '🚁',
      description: 'Hired and managed data team, implementing data-driven solutions for drone engineering, manufacturing, sales, and delivery operations.',
      tech: ['Python', 'SciPy', 'SimPy', 'SQL', 'ML', 'Survival Analysis', 'Team Leadership', 'Agile'],
      status: 'completed',
      details: {
        duration: 'Sept 2021 - Jan 2023',
        achievements: [
          'Hired and managed the data team, implementing data-driven solutions for drone engineering, manufacturing, sales, and delivery operations',
          'Led and executed high-stakes program to develop hub-and-spoke drone delivery network, survival analysis using ML, securing buy-in from multiple cross-functional leaders',
          'Managed project roadmaps and agile ceremonies (Kanban/Scrum) for data engineering and analytics teams',
          'Conducted ad-hoc operations analysis using SciPy, SimPy, and SQL, including GHG emissions modeling for drone networks',
          'Developed simulation and optimization tools for fleet allocation and healthcare supply chains to support Sales team in evaluating new markets'
        ],
        responsibilities: [
          'Data team leadership and management',
          'Cross-functional collaboration and stakeholder management',
          'Operations research and network optimization',
          'Agile project management and roadmapping',
          'Ad-hoc analysis and modeling for business decisions'
        ]
      }
    },
    {
      name: 'Mashey - Sr Analytics Consultant/Engineer',
      icon: '💻',
      description: 'Led development and migration of data stack (ETL to ELT) for e-commerce brand, moving from BigQuery to Snowflake and implementing dbt.',
      tech: ['dbt', 'Snowflake', 'BigQuery', 'ETL/ELT', 'SQL', 'GDPR', 'CCPA', 'Data Warehousing'],
      status: 'completed',
      details: {
        duration: 'June 2021 - Sept 2021',
        achievements: [
          'Led development and migration of data stack (ETL to ELT) for e-commerce brand, moving from BigQuery to Snowflake and implementing dbt',
          'Ensured data warehouse policies were compliant with GDPR and CCPA',
          'Analyzed user cohorts and trends to inform Go-To-Market strategies',
          'Contributed to $345,000 in quarterly savings by optimizing product and shipping costs'
        ],
        responsibilities: [
          'Data warehouse architecture and migration planning',
          'ETL to ELT pipeline transformation',
          'Compliance and data governance',
          'User analytics and cohort analysis',
          'Cost optimization through data insights'
        ]
      }
    },
    {
      name: 'Zipline International - Senior Data Analyst',
      icon: '✈️',
      description: 'Worked in Data and Operations Engineering teams, managing software and data projects to build internal tools for daily operations in US, Ghana, and Rwanda.',
      tech: ['Python', 'SQL', 'Sisense', 'Tableau', 'BI Tools', 'Microservices', 'Hypothesis Testing'],
      status: 'completed',
      details: {
        duration: 'June 2019 - May 2021',
        achievements: [
          'Worked in Data and Operations Engineering teams, managing software and data projects to build internal tools for daily operations in US, Ghana, and Rwanda',
          'Increased operational efficiency by 25% and site throughput by 33%',
          'Supported cross-functional teams with ad-hoc hypothesis testing, serving results via BI tools (Sisense, Tableau) and microservice apps',
          'Contributed to anomaly detection analysis that achieved a 15% reduction in per-unit aircraft manufacturing cost'
        ],
        responsibilities: [
          'Software and data project management',
          'Internal tool development for operations',
          'Cross-functional team support',
          'BI dashboard creation and maintenance',
          'Statistical analysis and hypothesis testing'
        ]
      }
    },
    {
      name: 'NEXTOR II (FAA Consortium) - Data Scientist',
      icon: '🛰️',
      description: 'Developed simulation model of US airspace to provide post-operations evaluation for airlines, the FAA, and airports.',
      tech: ['Python', 'Simulation', 'Queuing Theory', 'Operations Research', 'Aviation Analytics'],
      status: 'completed',
      details: {
        duration: 'Aug 2016 - Jan 2019',
        achievements: [
          'Developed simulation model of US airspace to provide post-operations evaluation for airlines, the FAA, and airports',
          'Implemented queuing theory simulation model to analyze and quantify operational capabilities for the Detroit Metro Airport expansion plan'
        ],
        responsibilities: [
          'Complex systems modeling and simulation development',
          'Queuing theory implementation',
          'Post-operations evaluation and analysis',
          'Collaboration with FAA, airlines, and airports',
          'Research and development in aviation operations'
        ]
      }
    },
    {
      name: 'PDF Miner - PDF Data Extraction Platform',
      icon: '📄',
      description: 'Production-ready PDF data extraction platform supporting 7 extraction backends with a unified service layer, featuring batch processing and multi-format export.',
      tech: ['Python', 'Streamlit', 'OCR', 'AI Integration', 'GPU', 'CI/CD', 'Python Package'],
      status: 'completed',
      url: 'https://github.com/prithivrajmu/extract-data-from-pdf/',
      details: {
        duration: '2024',
        achievements: [
          'Architected and developed a production-ready PDF data extraction platform supporting 7 extraction backends with a unified service layer',
          'Delivered a Streamlit web application enabling batch processing, custom field extraction, and multi-format export capabilities',
          'Optimized performance through GPU/CPU auto-detection, achieving 10-20x speedup for local OCR models',
          'Published as a Python package (v1.1.0) with CI/CD, comprehensive testing, and documentation'
        ],
        responsibilities: [
          'PDF data extraction platform architecture',
          'Multi-backend service layer design',
          'Performance optimization with GPU/CPU detection',
          'Python package development and publishing',
          'CI/CD pipeline implementation'
        ]
      }
    }
  ];

  const documentFiles: DocumentFile[] = [
    {
      name: 'Resume',
      icon: '/icons/Mail text.ico',
      type: 'pdf',
      onClick: () => {} // No action
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
      name: 'Portfolio',
      icon: '/icons/Constructor.ico',
      type: 'website',
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
               onClick={() => window.open('https://github.com/prithivrajmu', '_blank', 'noopener,noreferrer')}
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
          <div className="flex flex-wrap gap-2 text-xs">
            <button 
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