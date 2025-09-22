'use client';

import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';

interface AdBlockProps {
  type: 'inline' | 'sidebar' | 'block';
  id?: string;
  slot?: string;
  className?: string;
  style?: React.CSSProperties;
}

const AdBlock: React.FC<AdBlockProps> = ({ 
  type, 
  id, 
  slot, 
  className = '', 
  style = {} 
}) => {
  const { shouldShowAds } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [adLoaded, setAdLoaded] = useState(false);

  // Don't show ads for paid users
  if (!shouldShowAds()) {
    return null;
  }

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAdLoaded(true);
    }, 1000 + Math.random() * 2000); // Random loading time 1-3 seconds

    return () => clearTimeout(timer);
  }, []);

  const getAdDimensions = () => {
    switch (type) {
      case 'inline':
        return { width: '100%', height: '90px' };
      case 'sidebar':
        return { width: '300px', height: '250px' };
      case 'block':
        return { width: '100%', height: '250px' };
      default:
        return { width: '100%', height: '250px' };
    }
  };

  const dimensions = getAdDimensions();

  const getAdContent = () => {
    if (isLoading) {
      return (
        <div className="ad-skeleton">
          <div className="ad-skeleton-content">
            <div className="ad-skeleton-line"></div>
            <div className="ad-skeleton-line short"></div>
          </div>
        </div>
      );
    }

    if (adLoaded) {
      return (
        <div className="ad-content">
          <div className="ad-label">Advertisement</div>
          <div className="ad-placeholder">
            <div className="ad-icon">📢</div>
            <div className="ad-text">Ad Space</div>
            <div className="ad-slot">{slot || id || 'Ad Slot'}</div>
          </div>
        </div>
      );
    }

    return null;
  };

  const getResponsiveClasses = () => {
    const baseClasses = `ad-block ad-block--${type}`;
    if (type === 'sidebar') {
      return `${baseClasses} d-none d-lg-block`; // Hide on mobile
    }
    return baseClasses;
  };

  return (
    <div
      className={`${getResponsiveClasses()} ${className}`}
      style={{
        ...dimensions,
        ...style,
      }}
      data-ad-type={type}
      data-ad-id={id}
      data-ad-slot={slot}
    >
      {getAdContent()}
    </div>
  );
};

export default AdBlock;


