
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import PricingPage from './pages/PricingPage';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {user && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/results" element={user ? <ResultsPage /> : <Navigate to="/login" />} />
          <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/login" />} />
          <Route path="/pricing" element={user ? <PricingPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
