// Utility functions for error handling

export const handleApiError = (error, fallbackMessage = "An error occurred") => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || error.response.statusText;
    
    switch (status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Authentication required. Please log in.";
      case 403:
        return "Access denied. You don't have permission.";
      case 404:
        return "The requested resource was not found.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return `Server error: ${message || status}`;
    }
  } else if (error.request) {
    // Network error
    return "Network error. Please check your connection and try again.";
  } else {
    // Other error
    return error.message || fallbackMessage;
  }
};

export const handleComponentError = (error, componentName = 'Component') => {
  console.error(`${componentName} Error:`, error);
  
  return {
    hasError: true,
    message: `Error in ${componentName}: ${error.message || 'Unknown error'}`,
    timestamp: new Date().toISOString()
  };
};

export const handleImageError = (src, fallback = '/assets/img/placeholder.jpg') => {
  console.warn(`Image failed to load: ${src}, using fallback`);
  return fallback;
};

export const handleDataError = (error, dataType = 'data') => {
  console.error(`Data loading error for ${dataType}:`, error);
  
  return {
    error: true,
    message: `Failed to load ${dataType}`,
    details: error.message,
    retry: true
  };
};

// Error reporting utility (for production)
export const reportError = (error, context = {}) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, send to error reporting service
    const errorReport = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server'
    };
    
    // Example: Send to error reporting service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorReport)
    // }).catch(err => console.error('Failed to report error:', err));
    
    console.log('Error reported:', errorReport);
  }
};
