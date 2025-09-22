import React from 'react';
import Layout from '@/components/layout/Layout';
import { useUserStore } from '@/stores/useUserStore';

export default function LoginDemo() {
  const { isLoggedIn, isSubscriber, loginAsFree, loginAsPaid, logout } =
    useUserStore();

  return (
    <Layout>
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='card'>
              <div className='card-header'>
                <h2 className='card-title'>Login System Demo</h2>
              </div>
              <div className='card-body'>
                <div className='mb-4'>
                  <h4>Current User Status:</h4>
                  <div className='alert alert-info'>
                    <strong>Logged In:</strong> {isLoggedIn ? 'Yes' : 'No'}
                    <br />
                    <strong>User Type:</strong>{' '}
                    {isLoggedIn
                      ? isSubscriber
                        ? 'Paid User'
                        : 'Free User'
                      : 'Not logged in'}
                  </div>
                </div>

                <div className='mb-4'>
                  <h4>Test Actions:</h4>
                  <div className='btn-group' role='group'>
                    <button
                      className='btn btn-outline-primary'
                      onClick={loginAsFree}
                    >
                      Login as Free User
                    </button>
                    <button
                      className='btn btn-outline-warning'
                      onClick={loginAsPaid}
                    >
                      Login as Paid User
                    </button>
                    <button
                      className='btn btn-outline-danger'
                      onClick={logout}
                      disabled={!isLoggedIn}
                    >
                      Logout
                    </button>
                  </div>
                </div>

                <div className='mb-4'>
                  <h4>Features:</h4>
                  <ul className='list-group'>
                    <li className='list-group-item'>
                      <strong>State Persistence:</strong> User state persists
                      across page navigation
                    </li>
                    <li className='list-group-item'>
                      <strong>LocalStorage:</strong> State is saved to browser
                      storage
                    </li>
                    <li className='list-group-item'>
                      <strong>TypeScript:</strong> Fully typed with Zustand
                    </li>
                    <li className='list-group-item'>
                      <strong>Accessibility:</strong> Keyboard navigation and
                      ARIA labels
                    </li>
                    <li className='list-group-item'>
                      <strong>Responsive:</strong> Works on all screen sizes
                    </li>
                  </ul>
                </div>

                <div className='alert alert-success'>
                  <h5>How to Test:</h5>
                  <ol>
                    <li>Check the header - you should see a "Login" button</li>
                    <li>
                      Click "Login" to see the dropdown with Free/Paid options
                    </li>
                    <li>Select either option to log in</li>
                    <li>
                      Notice the header changes to show your user type and a
                      logout button
                    </li>
                    <li>Navigate to other pages - your login state persists</li>
                    <li>
                      Refresh the page - your login state is restored from
                      localStorage
                    </li>
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


