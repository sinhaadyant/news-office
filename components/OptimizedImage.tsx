import React, { useState, useCallback } from 'react';
import Image from 'next/image';
// import { Image as ImageType } from '@/types';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  showFallbackOnError?: boolean;
}

// Default placeholder image (SVG data URL)
const DEFAULT_PLACEHOLDER = `data:image/svg+xml;base64,${Buffer.from(
  `
  <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <g fill="#9ca3af" text-anchor="middle" font-family="Arial, sans-serif" font-size="14">
      <text x="50%" y="45%">Image</text>
      <text x="50%" y="55%">Not Available</text>
    </g>
  </svg>
`
).toString('base64')}`;

// Blur placeholder (low-quality image)
const BLUR_PLACEHOLDER = `data:image/svg+xml;base64,${Buffer.from(
  `
  <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <g fill="#d1d5db" text-anchor="middle" font-family="Arial, sans-serif" font-size="8">
      <text x="50%" y="50%">Loading...</text>
    </g>
  </svg>
`
).toString('base64')}`;

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  className = '',
  style,
  fill = false,
  quality = 75,
  onLoad,
  onError,
  fallbackSrc,
  showFallbackOnError = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  // Determine the image source
  const getImageSrc = () => {
    if (imageError && fallbackSrc) {
      return fallbackSrc;
    }
    if (imageError && showFallbackOnError) {
      return DEFAULT_PLACEHOLDER;
    }
    return src;
  };

  // Determine placeholder
  const getPlaceholder = () => {
    if (placeholder === 'blur') {
      return blurDataURL || BLUR_PLACEHOLDER;
    }
    return undefined;
  };

  // If no src provided, show placeholder immediately
  if (!src || src.trim() === '') {
    return (
      <div
        className={`optimized-image-container ${className}`}
        style={{
          width: width || '100%',
          height: height || '200px',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af',
          fontSize: '14px',
          ...style,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '8px' }}>📷</div>
          <div>No Image</div>
        </div>
      </div>
    );
  }

  // If fill is true, we need a container
  if (fill) {
    return (
      <div
        className={`optimized-image-container ${className}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          ...style,
        }}
      >
        <Image
          src={getImageSrc()}
          alt={alt}
          fill
          priority={priority}
          placeholder={placeholder}
          blurDataURL={getPlaceholder()}
          sizes={
            sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          }
          quality={quality}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        {/* Loading overlay */}
        {!imageLoaded && !imageError && (
          <div
            className='image-loading-overlay'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <div className='loading-spinner' />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        width: width || 'auto',
        height: height || 'auto',
        ...style,
      }}
    >
      <Image
        src={getImageSrc()}
        alt={alt}
        width={width || 400}
        height={height || 300}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={getPlaceholder()}
        sizes={
          sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        }
        quality={quality}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Loading overlay */}
      {!imageLoaded && !imageError && (
        <div
          className='image-loading-overlay'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div className='loading-spinner' />
        </div>
      )}

      <style jsx>{`
        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid #e5e7eb;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .optimized-image-container {
          overflow: hidden;
          border-radius: 8px;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .loading-spinner {
            border-color: #4b5563;
            border-top-color: #60a5fa;
          }
        }

        /* Accessibility improvements */
        .optimized-image-container img {
          transition: opacity 0.3s ease;
        }

        .optimized-image-container img[data-loaded='false'] {
          opacity: 0;
        }

        .optimized-image-container img[data-loaded='true'] {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;

// Utility function to generate blur data URL
export const generateBlurDataURL = (
  width: number = 40,
  height: number = 30
): string => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <g fill="#d1d5db" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.2}">
        <text x="50%" y="50%">Loading...</text>
      </g>
    </svg>
  `
  ).toString('base64')}`;
};

// Utility function to validate image URL
export const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;

  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i.test(url);
  } catch {
    return false;
  }
};

// Utility function to get image dimensions from URL (if available)
export const getImageDimensions = async (
  src: string
): Promise<{ width: number; height: number } | null> => {
  return new Promise(resolve => {
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = src;
  });
};
