import Image from 'next/image';
import { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className = '',
  fallback = '/assets/img/placeholder.jpg',
  placeholder = 'blur',
  blurDataURL,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  
  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // If image failed to load, show fallback
  if (imageError) {
    return (
      <div className={`optimized-image-fallback ${className}`} style={{ width, height }}>
        <Image
          src={fallback}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={`optimized-image-container ${className}`} style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
      
      {isLoading && (
        <div className="image-loading-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

// Article Image Component with specific sizing
export const ArticleImage = ({ 
  src, 
  alt, 
  className = '',
  priority = false,
  ...props 
}) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={`article-image ${className}`}
      priority={priority}
      {...props}
    />
  );
};

// Hero Image Component
export const HeroImage = ({ 
  src, 
  alt, 
  className = '',
  ...props 
}) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={600}
      className={`hero-image ${className}`}
      priority={true}
      {...props}
    />
  );
};

// Thumbnail Image Component
export const ThumbnailImage = ({ 
  src, 
  alt, 
  className = '',
  ...props 
}) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={200}
      height={150}
      className={`thumbnail-image ${className}`}
      {...props}
    />
  );
};

export default OptimizedImage;
