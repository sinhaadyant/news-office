/**
 * Theme Initializer - Ensures theme is properly applied on page load
 * This script should be loaded before the page renders to prevent theme flickering
 */

export const initializeTheme = () => {
  try {
    const savedTheme = localStorage.getItem('toggleTheme');
    const theme = savedTheme ? JSON.parse(savedTheme) : 'light-theme';

    // Apply theme class immediately to prevent flash
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);

    return theme;
  } catch (error) {
    console.warn('Failed to initialize theme:', error);
    // Fallback to light theme
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add('light-theme');
    return 'light-theme';
  }
};

/**
 * Theme utilities for consistent theme management
 */
export const themeUtils = {
  getCurrentTheme: () => {
    try {
      return JSON.parse(localStorage.getItem('toggleTheme')) || 'light-theme';
    } catch (error) {
      console.warn('Failed to get theme from localStorage:', error);
      return 'light-theme';
    }
  },

  setTheme: theme => {
    try {
      localStorage.setItem('toggleTheme', JSON.stringify(theme));
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(theme);
      return true;
    } catch (error) {
      console.warn('Failed to set theme:', error);
      return false;
    }
  },

  toggleTheme: () => {
    const currentTheme = themeUtils.getCurrentTheme();
    const newTheme =
      currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    return themeUtils.setTheme(newTheme);
  },
};
