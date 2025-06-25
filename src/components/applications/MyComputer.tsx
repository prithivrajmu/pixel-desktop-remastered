
import React from 'react';

export const MyComputer: React.FC = () => {
  return (
    <div className="p-4 bg-gray-200 h-full font-mono text-sm">
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-32 h-40 bg-gray-300 border-2 border-gray-400 flex items-center justify-center text-6xl" style={{ borderStyle: 'inset' }}>
          👨‍💻
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">System Properties</h2>
          <div className="space-y-1 text-xs">
            <p><strong>Name:</strong> John Developer</p>
            <p><strong>Profession:</strong> Full Stack Developer</p>
            <p><strong>Experience:</strong> 5+ Years</p>
            <p><strong>Location:</strong> San Francisco, CA</p>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-gray-400 p-3 mb-4" style={{ borderStyle: 'inset' }}>
        <h3 className="font-bold mb-2">Skills & Technologies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p><strong>Languages:</strong></p>
            <p>• JavaScript/TypeScript</p>
            <p>• Python</p>
            <p>• Java</p>
          </div>
          <div>
            <p><strong>Frameworks:</strong></p>
            <p>• React/Next.js</p>
            <p>• Node.js</p>
            <p>• Django</p>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-400 p-3" style={{ borderStyle: 'inset' }}>
        <h3 className="font-bold mb-2">About</h3>
        <p className="text-xs leading-relaxed">
          Passionate full-stack developer with expertise in modern web technologies. 
          I enjoy creating innovative solutions and have a particular fondness for 
          retro computing aesthetics, as evidenced by this Windows 95-inspired portfolio!
        </p>
      </div>
    </div>
  );
};
