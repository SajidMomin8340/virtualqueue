import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './Components/dash';
import Login from './Components/login';
import Signup from './Components/signup';
import Navbar from './Components/navbar';
import AdminPage from './Components/AdminPage';
import VirtualQueue from './Components/VirtualQueue';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      console.log('Retrieved token:', token); // Debug: Check token retrieval
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'your-auth-token'); // Save token in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Remove token from localStorage
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Navbar onLogout={handleLogout} />
                <Dash />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/virtual-queue"
          element={
            isAuthenticated ? (
              <>
                <Navbar onLogout={handleLogout} />
                <VirtualQueue />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <>
                <Navbar onLogout={handleLogout} />
                <AdminPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
