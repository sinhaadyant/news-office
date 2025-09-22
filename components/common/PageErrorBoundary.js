import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Link from 'next/link';

// Specialized Error Boundary for Pages
const PageErrorBoundary = ({ children, pageName = 'page' }) => {
  const fallbackUI = (
    <div className='page-error-boundary'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='page-error-content text-center'>
              <div className='error-icon mb-4'>
                <i
                  className='fas fa-exclamation-triangle text-warning'
                  style={{ fontSize: '4rem' }}
                ></i>
              </div>
              <h2 className='error-title mb-3'>Oops! Something went wrong</h2>
              <p className='error-message mb-4'>
                We encountered an issue while loading the {pageName}. This might
                be a temporary problem.
              </p>
              <div className='error-actions'>
                <Link href='/' className='btn btn-primary me-2'>
                  <i className='fas fa-home me-2'></i>
                  Go Home
                </Link>
                <Link href='/latest-news' className='btn btn-outline-secondary'>
                  <i className='fas fa-newspaper me-2'></i>
                  Latest News
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <ErrorBoundary fallback={fallbackUI}>{children}</ErrorBoundary>;
};

export default PageErrorBoundary;
