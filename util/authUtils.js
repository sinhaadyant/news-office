/**
 * Utility functions for user authentication and premium content access
 */

/**
 * Check if the current user is a paid user with active subscription
 * @returns {boolean} True if user is logged in and has paid subscription
 */
export const isPaidUser = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const savedUser = localStorage.getItem('newsOfficeUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      
      // Check if user has active paid subscription
      if (userData.isPaid && userData.subscriptionExpiry) {
        return new Date(userData.subscriptionExpiry) > new Date();
      }
      
      return userData.isPaid || userData.subscriptionType === 'premium';
    }
  } catch (error) {
    console.error('Error checking user status:', error);
  }
  
  return false;
};

/**
 * Check if premium content should be shown (hide premium badges for paid users)
 * @param {boolean} isPremium - Whether the content is premium
 * @returns {boolean} True if premium badge should be shown
 */
export const shouldShowPremiumBadge = (isPremium) => {
  if (!isPremium) return false;
  return !isPaidUser();
};

/**
 * Get current user data
 * @returns {object|null} User data or null if not logged in
 */
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedUser = localStorage.getItem('newsOfficeUser');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in
 */
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};
