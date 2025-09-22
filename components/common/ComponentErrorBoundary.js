import React from 'react';
import ErrorBoundary from './ErrorBoundary';

// Lightweight Error Boundary for Components
const ComponentErrorBoundary = ({ children, componentName = 'component' }) => {
  const fallbackUI = (
    <div className='component-error-placeholder'>
      <div className='text-center p-3'>
        <i className='fas fa-exclamation-circle text-muted mb-2'></i>
        <p className='text-muted small mb-0'>Unable to load {componentName}</p>
      </div>
    </div>
  );

  return <ErrorBoundary fallback={fallbackUI}>{children}</ErrorBoundary>;
};

export default ComponentErrorBoundary;
