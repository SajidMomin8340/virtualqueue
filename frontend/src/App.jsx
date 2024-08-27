import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dash from './Components/dash';
import Login from './Components/login';
import Signup from './Components/signup';
import Navbar from './Components/navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login
  const handleLogin = () => setIsAuthenticated(true);
  
  // Handle logout
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for login page without Navbar */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Routes with Navbar */}
        <Route element={isAuthenticated ? <Navbar /> : <Navigate to="/login" />}>
          <Route 
            path="/" 
            element={isAuthenticated ? <Dash /> : <Navigate to="/login" />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
