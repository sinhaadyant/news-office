'use client';

import React from 'react';
import { useUserStore } from '@/stores/useUserStore';

const LoginButton: React.FC = () => {
  const { isLoggedIn, isSubscriber, loginAsFree, loginAsPaid, logout } =
    useUserStore();

  const handleFreeLogin = () => {
    loginAsFree();
  };

  const handlePaidLogin = () => {
    loginAsPaid();
  };

  const handleLogout = () => {
    logout();
  };

  // If user is logged in, show user status and logout button
  if (isLoggedIn) {
    return (
      <div className='login-btn'>
        <span
          className={`user-badge ${isSubscriber ? 'paid-user' : 'free-user'}`}
          aria-label={`User type: ${isSubscriber ? 'Paid' : 'Free'}`}
        >
          {isSubscriber ? 'Paid User' : 'Free User'}
        </span>
        <button
          onClick={handleLogout}
          className='login-button logout-btn'
          aria-label='Logout'
        >
          Logout
        </button>
      </div>
    );
  }

  // If user is not logged in, show two login buttons
  return (
    <div className='login-btn'>
      <button
        onClick={handleFreeLogin}
        className='login-button free-login'
        aria-label='Login as Free User'
      >
        Free Login
      </button>
      <button
        onClick={handlePaidLogin}
        className='login-button paid-login'
        aria-label='Login as Paid User'
      >
        Paid Login
      </button>
    </div>
  );
};

export default LoginButton;

