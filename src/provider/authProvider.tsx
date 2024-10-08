'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';

interface AuthContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
  initialToken: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, initialToken }: AuthProviderProps) {
  const [token, setToken] = useState(initialToken);
  const value = useMemo(() => ({ token, setToken }), [token]);

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
