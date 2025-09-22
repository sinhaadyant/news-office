import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log the error to an error reporting service here
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service
      this.logErrorToService(error, errorInfo);
    }
  }

  logErrorToService = (error, errorInfo) => {
    // Example: Send to error reporting service
    // You can integrate with services like Sentry, LogRocket, etc.
    console.log('Would send error to reporting service:', {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='error-boundary'>
          <div className='error-boundary-content'>
            <div className='error-icon'>
              <i className='fas fa-exclamation-triangle text-warning'></i>
            </div>
            <h2 className='error-title'>Oops! Something went wrong</h2>
            <p className='error-message'>
              We're sorry, but something unexpected happened. Please try again.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='error-details'>
                <summary>Error Details (Development Only)</summary>
                <pre className='error-stack'>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className='error-actions'>
              <button className='btn btn-primary' onClick={this.handleRetry}>
                <i className='fas fa-redo me-2'></i>
                Try Again
              </button>
              <button
                className='btn btn-outline-secondary ms-2'
                onClick={() => window.location.reload()}
              >
                <i className='fas fa-refresh me-2'></i>
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
