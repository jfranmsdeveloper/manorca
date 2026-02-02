import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';

import React from 'react';
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
