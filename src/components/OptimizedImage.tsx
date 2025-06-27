import React, { useState, useRef, useEffect, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onError?: () => void;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  fallback?: string | React.ReactNode;
}

const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  onError,
  onLoad,
  loading = 'lazy',
  fallback
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Show fallback if error occurred
  if (hasError && fallback) {
    if (typeof fallback === 'string') {
      return (
        <img
          ref={imgRef}
          src={fallback}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={style}
          onLoad={handleLoad}
        />
      );
    }
    return <>{fallback}</>;
  }

  return (
    <div
      ref={imgRef}
      className={`relative ${className}`}
      style={{ width, height, ...style }}
    >
      {/* Loading placeholder */}
      {!isLoaded && isInView && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-xs text-gray-500">Loading...</div>
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
          style={{ 
            imageRendering: 'pixelated',
            ...style 
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 