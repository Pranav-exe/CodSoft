import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRide from './pages/CreateRide';
import RideDetails from './pages/RideDetails';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-ride" element={<CreateRide />} />
        <Route path="/ride/:id" element={<RideDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;