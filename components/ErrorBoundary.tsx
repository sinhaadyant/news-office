import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from '@/types';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
  name?: string;
}

interface ErrorBoundaryState extends ErrorState {}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, name } = this.props;

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `ErrorBoundary ${name || 'unnamed'} caught an error:`,
        error,
        errorInfo
      );
    }

    // Call custom error handler
    onError?.(error, errorInfo);

    // Update state with error info
    this.setState({
      errorInfo: {
        componentStack: errorInfo.componentStack || '',
        errorBoundary: name || '',
      },
    });

    // Report to error tracking service (Sentry, LogRocket, etc.)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
      });
    }
  }

  override componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props;
    const { hasError } = this.state;

    if (hasError && resetOnPropsChange) {
      const hasResetKeyChanged = resetKeys?.some((key, index) => {
        return prevProps.resetKeys?.[index] !== key;
      });

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  override componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      retryCount: this.state.retryCount + 1,
    });
  };

  handleRetry = () => {
    this.resetErrorBoundary();
  };

  override render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div
          role='alert'
          aria-live='polite'
          className='error-boundary'
          style={{
            padding: '2rem',
            margin: '1rem',
            border: '1px solid #e53e3e',
            borderRadius: '8px',
            backgroundColor: '#fed7d7',
            color: '#9b2c2c',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: '0.5rem' }}
            >
              <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
                fill='currentColor'
              />
            </svg>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
              Something went wrong
            </h2>
          </div>

          <p style={{ marginBottom: '1rem', lineHeight: '1.5' }}>
            We encountered an unexpected error. Please try refreshing the page
            or contact support if the problem persists.
          </p>

          {process.env.NODE_ENV === 'development' && error && (
            <details style={{ marginBottom: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                }}
              >
                {error.toString()}
                {errorInfo?.componentStack && (
                  <>
                    {'\n\nComponent Stack:'}
                    {errorInfo.componentStack}
                  </>
                )}
              </pre>
            </details>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#2c5aa0';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#3182ce';
              }}
            >
              Try Again
            </button>

            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#38a169',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#2f855a';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#38a169';
              }}
            >
              Refresh Page
            </button>

            {retryCount > 3 && (
              <button
                onClick={() => (window.location.href = '/')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#718096',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                Go to Homepage
              </button>
            )}
          </div>

          {retryCount > 0 && (
            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                opacity: 0.8,
              }}
            >
              Retry attempts: {retryCount}
            </p>
          )}
        </div>
      );
    }

    return children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Hook for error boundary context (if needed)
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Unhandled error:', error, errorInfo);

    // Report to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
      });
    }
  };
}
