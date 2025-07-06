import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md', 
  fallback 
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };
  
  if (imageError || !src) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center`}>
        {fallback || <User data-testid="avatar-fallback-icon" className={`${iconSizes[size]} text-gray-500`} />}
      </div>
    );
  }
  
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
};