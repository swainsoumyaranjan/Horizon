import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Dashboard } from './pages/Dashboard';
import { MapPage } from './pages/MapPage';
import { ContentPage } from './pages/ContentPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { CommunityPage } from './pages/CommunityPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/auth/PrivateRoute';
import axiosInstance from './lib/axios';
//import './App.css';

// Custom styles

// Configure default axios instance
axiosInstance.defaults.baseURL = 'https://localhost:3443';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            {/* Private Routes (Protected) */}
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>} />
            <Route path="/content" element={<PrivateRoute><ContentPage /></PrivateRoute>} />
            <Route path="/opportunities" element={<PrivateRoute><OpportunitiesPage /></PrivateRoute>} />
            <Route path="/community" element={<PrivateRoute><CommunityPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
