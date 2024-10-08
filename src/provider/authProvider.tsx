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

  // AuthContext.Provider를 통해 token과 setToken을 공유
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    // AuthContext가 null일 때 에러 발생
    console.log('provider로 감싸지 않았음!');
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// 이후 클라이언트 컴포넌트에게 씌워서 사용
