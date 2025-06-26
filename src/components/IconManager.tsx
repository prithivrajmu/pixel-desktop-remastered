
import React from 'react';

export interface CustomIcon {
  id: string;
  name: string;
  path: string;
  fallback: string;
}

interface IconManagerProps {
  iconId: string;
  fallback: string;
  className?: string;
  size?: number;
}

export const IconManager: React.FC<IconManagerProps> = ({ 
  iconId, 
  fallback, 
  className = "",
  size = 32 
}) => {
  const [iconError, setIconError] = React.useState(false);
  
  // You can replace this with your custom icons mapping
  const customIcons: Record<string, string> = {
    'my-computer': '/icons/computer.png',
    'my-documents': '/icons/documents.png',
    'internet-explorer': '/icons/internet.png',
    'notepad': '/icons/notepad.png',
    'recycle-bin': '/icons/recycle.png'
  };

  const iconPath = customIcons[iconId];

  const handleImageError = () => {
    setIconError(true);
  };

  if (!iconPath || iconError) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ fontSize: `${size}px` }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={iconPath}
      alt={iconId}
      width={size}
      height={size}
      className={className}
      onError={handleImageError}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
