import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


const App = () => {
    return (
        <Router>
            <NavBar />
            <div style={{ paddingTop: '64px' }}> {/* Adjust padding if NavBar height is different */}
                <Routes>
                    {/* Default route redirects to /register */}
                    <Route path="/" element={<Navigate to="/register" />} />

                    {/* Other routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;