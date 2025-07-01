import React from 'react';
import OptimizedImage from './OptimizedImage';

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
        {iconId === 'my-documents' && '📁'}
        {iconId === 'recycle-bin' && '🗑️'}
        {iconId === 'the-internet' && '🌐'}
        {iconId === 'set-up-the-microsoft-network' && '📧'}
        {!['my-computer', 'my-documents', 'recycle-bin', 'the-internet', 'set-up-the-microsoft-network'].includes(iconId) && '📄'}
      </div>
    );
  }

  return (
    <OptimizedImage
      src={iconPath}
      alt={iconId}
      width={size}
      height={size}
      className={className}
      onError={handleImageError}
      loading="lazy"
      fallback={
        <div 
          className={`flex items-center justify-center ${className}`}
          style={{ fontSize: `${size}px` }}
        >
          {iconId === 'my-computer' && '💻'}
          {iconId === 'my-documents' && '📁'}
          {iconId === 'recycle-bin' && '🗑️'}
          {iconId === 'the-internet' && '🌐'}
          {iconId === 'set-up-the-microsoft-network' && '📧'}
          {!['my-computer', 'my-documents', 'recycle-bin', 'the-internet', 'set-up-the-microsoft-network'].includes(iconId) && '📄'}
        </div>
      }
    />
  );
};
