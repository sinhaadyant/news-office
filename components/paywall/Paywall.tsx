'use client';

import React from 'react';
import { useUserStore } from '@/stores/useUserStore';

interface PaywallProps {
  isPremium: boolean;
  children: React.ReactNode;
  content?: string;
  className?: string;
}

const Paywall: React.FC<PaywallProps> = ({
  isPremium,
  children,
  content,
  className = '',
}) => {
  const { isLoggedIn, canViewFullContent, loginAsPaid } = useUserStore();

  // If not premium content, always show full content
  if (!isPremium) {
    return <>{children}</>;
  }

  // If premium content and user can view it, show full content
  if (canViewFullContent(isPremium)) {
    return <>{children}</>;
  }

  // Show paywall for premium content
  return (
    <div className={`paywall ${className}`}>
      <div className='paywall-content'>
        {content && <div className='paywall-preview'>{content}</div>}

        <div className='paywall-overlay'>
          <div className='paywall-message'>
            <div className='paywall-icon'>
              <i className='fas fa-lock'></i>
            </div>
            <h3>Premium Content</h3>
            <p>
              {isLoggedIn
                ? 'This is premium content. Please upgrade to continue reading.'
                : 'This is premium content. Please login and subscribe to continue reading.'}
            </p>

            <div className='paywall-actions'>
              {!isLoggedIn ? (
                <button
                  className='btn btn-primary'
                  onClick={() => (window.location.href = '/login')}
                >
                  Login to Continue
                </button>
              ) : (
                <button className='btn btn-primary' onClick={loginAsPaid}>
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paywall;
