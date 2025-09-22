import React, { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const LoginButton = () => {
  const { isLoggedIn, isSubscriber, loginAsFree, loginAsPaid, logout } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFreeUserLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate a brief loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      loginAsFree();
      console.log('Logged in as Free User');
    } catch (error) {
      console.error('Free login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaidUserLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate a brief loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      loginAsPaid();
      console.log('Logged in as Paid User');
    } catch (error) {
      console.error('Paid login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    console.log('User logged out');
  };

  if (isLoading) {
    return (
      <div className="user-menu">
        <button className="btn btn-sm btn-outline-secondary" disabled>
          <i className="fas fa-spinner fa-spin me-1"></i>
          Loading...
        </button>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="user-menu">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">
            Welcome, {isSubscriber ? 'Paid User' : 'Free User'}
          </span>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={handleLogout}
            disabled={isLoading}
          >
            <i className="far fa-user me-1"></i>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-section">
      <div className="d-flex gap-2">
        <button 
          className="btn btn-sm btn-primary"
          onClick={handleFreeUserLogin}
          disabled={isLoading}
        >
          <i className="far fa-user me-1"></i>
          Free User Login
        </button>
        <button 
          className="btn btn-sm btn-success"
          onClick={handlePaidUserLogin}
          disabled={isLoading}
        >
          <i className="far fa-crown me-1"></i>
          Paid User Login
        </button>
      </div>
    </div>
  );
};

export default LoginButton;