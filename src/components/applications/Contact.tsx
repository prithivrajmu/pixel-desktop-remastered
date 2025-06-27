import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="p-6 bg-gray-200 h-full flex flex-col justify-center items-center font-mono text-sm" style={{ fontFamily: 'MS Sans Serif, sans-serif' }}>
      <h2 className="text-lg font-bold mb-6">Contact Information</h2>
      <div className="w-full max-w-xs space-y-4">
        <div className="flex items-center space-x-2">
          <img src="/icons/Contact Card.ico" alt="Email" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
          <a href="mailto:prithivrajmu@gmail.com" className="text-blue-700 underline hover:text-blue-900">prithivrajmu@gmail.com</a>
        </div>
        <div className="flex items-center space-x-2">
          <img src="/icons/Desktop.ico" alt="GitHub" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
          <a href="https://github.com/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">GitHub</a>
        </div>
        <div className="flex items-center space-x-2">
          <img src="/icons/People.ico" alt="LinkedIn" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
          <a href="https://linkedin.com/in/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}; 