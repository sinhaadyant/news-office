import React from 'react';
import Link from 'next/link';

const EmptyState = ({ 
  title = "No Content Available", 
  message = "There are no articles to display at the moment.",
  showHomeLink = true,
  showLatestNewsLink = true 
}) => {
  return (
    <div className="empty-state text-center py-5">
      <div className="empty-state-icon mb-3">
        <i className="fas fa-newspaper text-muted" style={{ fontSize: '3rem' }}></i>
      </div>
      <h4 className="empty-state-title text-muted mb-3">{title}</h4>
      <p className="empty-state-message text-muted mb-4">{message}</p>
      <div className="empty-state-actions">
        {showHomeLink && (
          <Link href="/" className="btn btn-primary me-2">
            <i className="fas fa-home me-2"></i>
            Go Home
          </Link>
        )}
        {showLatestNewsLink && (
          <Link href="/latest-news" className="btn btn-outline-secondary">
            <i className="fas fa-newspaper me-2"></i>
            Latest News
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

