'use client';

import React from 'react';

interface PremiumBadgeProps {
  isPremium: boolean;
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  isPremium, 
  className = '' 
}) => {
  if (!isPremium) return null;

  return (
    <span className={`premium-badge ${className}`}>
      <i className="fas fa-crown"></i>
      Premium
    </span>
  );
};

export default PremiumBadge;


