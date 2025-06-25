
import React from 'react';

interface Project {
  name: string;
  icon: string;
  description: string;
  tech: string[];
  status: 'completed' | 'in-progress' | 'archived';
}

export const MyDocuments: React.FC = () => {
  const projects: Project[] = [
    {
      name: 'E-Commerce Platform',
      icon: '🛒',
      description: 'Full-stack online store with payment integration',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'completed'
    },
    {
      name: 'Task Management App',
      icon: '📋',
      description: 'Collaborative project management tool',
      tech: ['Vue.js', 'Express', 'PostgreSQL'],
      status: 'completed'
    },
    {
      name: 'Weather Dashboard',
      icon: '🌤️',
      description: 'Real-time weather data visualization',
      tech: ['React', 'D3.js', 'OpenWeather API'],
      status: 'in-progress'
    },
    {
      name: 'Chat Application',
      icon: '💬',
      description: 'Real-time messaging with WebSocket',
      tech: ['Socket.io', 'React', 'Redis'],
      status: 'archived'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-700';
      case 'in-progress': return 'text-blue-700';
      case 'archived': return 'text-gray-600';
      default: return 'text-black';
    }
  };

  return (
    <div className="p-4 bg-gray-200 h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">My Projects</h2>
        <div className="text-xs text-gray-600">
          Double-click a project to view details
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
                <div className={`text-xs ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>
            </div>
            <p className="text-xs mb-2 leading-relaxed">{project.description}</p>
            <div className="text-xs">
              <strong>Tech:</strong> {project.tech.join(', ')}
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
            🔗 GitHub
          </button>
          <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
            💼 LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};
