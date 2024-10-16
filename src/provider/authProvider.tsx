'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, isLoggedIn }: AuthProviderProps) {
  const value = useMemo(() => ({ isLoggedIn }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.log('provider로 감싸지 않았음!');
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
