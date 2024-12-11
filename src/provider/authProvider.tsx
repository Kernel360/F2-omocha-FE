'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>; // isSetLoggedIn을 상태 변경 함수로 포함
}

interface AuthProviderProps {
  children: ReactNode;
  isLoggedIn?: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, isLoggedIn }: AuthProviderProps) {
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn || false);
  const [clientAccessToken, setClientAccessToken] = useState('');

  const value = useMemo(
    () => ({
      isLoggedIn: isLoggedInState,
      setIsLoggedIn: setIsLoggedInState,
      clientAccessToken,
      setClientAccessToken,
    }),
    [isLoggedInState, clientAccessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서만 사용할 수 있습니다.');
  }

  return context; // isLoggedIn과 setIsLoggedIn 반환
};
