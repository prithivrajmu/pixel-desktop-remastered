import React from 'react';

interface Project {
  name: string;
  icon: string;
  description: string;
  tech: string[];
  status: 'current' | 'completed';
}

export const MyDocuments: React.FC = () => {
  const projects: Project[] = [
    {
      name: 'A M Foods - Director',
      icon: '🍲',
      description: 'Driving modernization and operational efficiency for a legacy restaurant brand (est. 1973). Architected custom inventory & payroll software.',
      tech: ['Business Leadership', 'Software Dev', 'Digital Transformation', 'Data-Driven Inventory'],
      status: 'current'
    },
    {
      name: 'Nalam Properties - Founder',
      icon: '🏠',
      description: 'Launched a real estate venture (nalamproperties.com). Built a proprietary website and lead management system from the ground up.',
      tech: ['Entrepreneurship', 'Full-Stack Dev', 'SEO', 'Agent-Based Simulation'],
      status: 'current'
    },
    {
      name: 'Zipline - Sr. Data Analyst',
      icon: '✈️',
      description: 'Managed software/data teams to build operational tools. Reduced aircraft manufacturing costs by 15% and improved efficiency by 25%.',
      tech: ['ETL', 'Docker', 'Sisense', 'Tableau', 'Hypothesis Testing', 'Process Improvement'],
      status: 'completed'
    },
    {
      name: 'Volansi - Lead Data Eng.',
      icon: '🚁',
      description: 'Led data team for drone manufacturing & delivery. Developed hub-and-spoke network models to optimize fleet operations.',
      tech: ['Python', 'Scipy', 'OpenCV', 'SQL', 'Team Leadership', 'Agile'],
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-700';
      case 'completed': return 'text-blue-700';
      default: return 'text-black';
    }
  };

  return (
    <div className="p-4 bg-gray-200 h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">My Experience</h2>
        <div className="text-xs text-gray-600">
          Double-click an item to view details
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-300 border-2 border-gray-400 p-3 cursor-pointer hover:bg-gray-250 transition-colors"
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
          <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
            📄 Resume.pdf
          </button>
          <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
            <a href="https://linkedin.com/in/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">🔗 LinkedIn</a>
          </button>
        </div>
      </div>
    </div>
  );
};