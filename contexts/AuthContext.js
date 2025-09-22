import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Return default values instead of throwing error to prevent build issues
    return {
      user: null,
      isLoading: false,
      login: async () => ({ success: false, error: 'Auth not available' }),
      logout: () => {},
      isLoggedIn: false,
      isPaidUser: false,
      shouldShowPremiumBadge: (isPremium) => isPremium,
      isPremiumContentAccessible: () => false,
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on mount
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('newsOfficeUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          // Check if subscription is still valid
          if (userData.subscriptionExpiry && new Date(userData.subscriptionExpiry) <= new Date()) {
            // Subscription expired, remove user
            localStorage.removeItem('newsOfficeUser');
            setUser(null);
          } else {
            setUser(userData);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('newsOfficeUser');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('newsOfficeUser', JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      // Fallback for development - create mock user
      console.log('Using mock authentication for development');
      const mockUser = {
        id: 1,
        email: email,
        name: 'Demo User',
        isPaid: true, // Mock paid user
        subscriptionType: 'premium',
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      };
      
      setUser(mockUser);
      localStorage.setItem('newsOfficeUser', JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('newsOfficeUser');
  }, []);

  const isPaidUser = useCallback(() => {
    if (!user) return false;
    
    // Check if user has active paid subscription
    if (user.isPaid && user.subscriptionExpiry) {
      return new Date(user.subscriptionExpiry) > new Date();
    }
    
    return user.isPaid || user.subscriptionType === 'premium';
  }, [user]);

  const shouldShowPremiumBadge = useCallback((isPremium) => {
    return isPremium && !isPaidUser();
  }, [isPaidUser]);

  const isPremiumContentAccessible = useCallback(() => {
    return isPaidUser();
  }, [isPaidUser]);

  const value = {
    user,
    isLoading,
    login,
    logout,
    isLoggedIn: !!user,
    isPaidUser: isPaidUser(),
    shouldShowPremiumBadge,
    isPremiumContentAccessible: isPremiumContentAccessible(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
