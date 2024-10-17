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
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, isLoggedIn }: AuthProviderProps) {
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);

  // value에 isLoggedIn과 setIsLoggedIn을 모두 포함한 객체 전달
  const value = useMemo(
    () => ({
      isLoggedIn: isLoggedInState,
      setIsLoggedIn: setIsLoggedInState,
    }),
    [isLoggedInState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.log('AuthProvider로 감싸지 않았습니다!');
    throw new Error('useAuth는 AuthProvider 내에서만 사용할 수 있습니다.');
  }

  return context; // isLoggedIn과 setIsLoggedIn 반환
};
