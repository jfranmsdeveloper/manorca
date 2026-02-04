import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    isEditMode: boolean;
    login: (password: string, username: string) => boolean;
    logout: () => void;
    toggleEditMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check session storage on mount
        const storedAuth = sessionStorage.getItem('manorca_auth');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (password: string, username: string) => {
        // Hardcoded credentials as requested
        if (username === 'manorca' && password === 'OrtegaCaballero2026') {
            sessionStorage.setItem('manorca_auth', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('manorca_auth');
        setIsAuthenticated(false);
        setIsEditMode(false); // Disable edit mode on logout
    };

    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    if (isLoading) {
        return null; // Or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isEditMode, login, logout, toggleEditMode }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
