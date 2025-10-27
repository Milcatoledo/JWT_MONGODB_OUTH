import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, ready } = useAuth();
    if (!ready) return null; 

    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;
