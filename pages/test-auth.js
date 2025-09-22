import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumBadge from '@/components/common/PremiumBadge';
import LoginButton from '@/components/auth/LoginButton';
import { useUserStore } from '@/stores/useUserStore';

export default function TestAuth() {
  const { isLoggedIn, isSubscriber } = useUserStore();
  const [refreshKey, setRefreshKey] = useState(0);

  // Force re-render when user state changes
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h1>Authentication & Premium Content Test Page</h1>
            <p className="text-muted">Test the login system and premium badge functionality</p>
            
            <div className="card mb-4">
              <div className="card-header">
                <h3>Current Authentication Status</h3>
              </div>
              <div className="card-body">
                <p><strong>Logged In:</strong> {isLoggedIn ? 'Yes' : 'No'}</p>
                <p><strong>User Type:</strong> {isLoggedIn ? (isSubscriber ? 'Paid User' : 'Free User') : 'Not logged in'}</p>
                
                <div className="mt-3">
                  <h5>Login Controls:</h5>
                  <LoginButton />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Premium Badge Test</h3>
              </div>
              <div className="card-body">
                <p>Premium badges should be hidden when a paid user is logged in:</p>
                
                <div className="row">
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h5>Premium Article</h5>
                        <PremiumBadge isPremium={true} />
                        <p className="mt-2">This article has premium content</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h5>Regular Article</h5>
                        <PremiumBadge isPremium={false} />
                        <p className="mt-2">This is a regular article</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h5>Another Premium</h5>
                        <PremiumBadge isPremium={true} />
                        <p className="mt-2">Another premium article</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5>Instructions:</h5>
                  <ol>
                    <li>When not logged in: Premium badges should be visible on premium articles</li>
                    <li>When logged in as Free User: Premium badges should still be visible on premium articles</li>
                    <li>When logged in as Paid User: Premium badges should be hidden on premium articles</li>
                    <li>Regular articles should never show premium badges</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}