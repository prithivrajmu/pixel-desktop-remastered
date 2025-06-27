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

  const handleImageError = () => {
    setIconError(true);
  };

  // Use the fallback path directly since we're now passing the correct icon paths
  const iconPath = fallback;

  if (!iconPath || iconError) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ fontSize: `${size}px` }}
      >
        {/* Fallback emoji for each icon type */}
        {iconId === 'my-computer' && '💻'}
        {iconId === 'inbox' && '📁'}
        {iconId === 'recycle-bin' && '🗑️'}
        {iconId === 'the-internet' && '🌐'}
        {iconId === 'set-up-the-microsoft-network' && '📧'}
        {!['my-computer', 'inbox', 'recycle-bin', 'the-internet', 'set-up-the-microsoft-network'].includes(iconId) && '📄'}
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
