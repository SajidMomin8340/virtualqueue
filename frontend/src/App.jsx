import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dash from './Components/dash';
import Login from './Components/login';
import Signup from './Components/signup';
import Navbar from './Components/navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for login page without Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Routes with Navbar */}
        <Route element={<Navbar />}>
          <Route path="/" element={<Dash />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
