import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Adjust import if needed

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Decode and verify token expiration
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userFullName');
          setIsAuthenticated(false);
          return;
        }

        const userId = localStorage.getItem('userId');
        const userFullName = localStorage.getItem('userFullName');

        if (!userId || !userFullName) {
          setIsAuthenticated(false);
          return;
        }

        const response = await fetch('http://localhost:3005/api/auth/protectedRoute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token,
          },
          body: JSON.stringify({ userId, userFullName }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.clear(); // Clear all localStorage on failure
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Token verification failed:', err);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    // Placeholder for loading spinner
    return <div className="loading-spinner">Loading...</div>;
  }

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
