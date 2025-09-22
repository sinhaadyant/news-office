'use client';

import React from 'react';
import { useUserStore } from '@/stores/useUserStore';

interface PremiumBadgeProps {
  isPremium: boolean;
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  isPremium,
  className = ''
}) => {
  const { isLoggedIn, isSubscriber } = useUserStore();
  
  // Show premium badge only if content is premium and user is not a paid subscriber
  const shouldShow = isPremium && (!isLoggedIn || !isSubscriber);
  
  // Don't render if should not show premium badge
  if (!shouldShow) {
    return null;
  }

  return (
    <span className={`premium-badge ${className}`}>
      <i className="fas fa-crown"></i>
      Premium
    </span>
  );
};

export default PremiumBadge;


