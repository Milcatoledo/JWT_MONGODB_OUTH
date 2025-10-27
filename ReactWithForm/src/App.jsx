import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PersonList } from './pages/PersonList';
import RegisterUser from './pages/register';
import Login from './pages/Login';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <main>
            <Routes>
              <Route path="/" element={<ProtectedRoute><PersonList /></ProtectedRoute>} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;