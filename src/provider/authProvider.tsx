'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
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
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    setIsLoggedInState(!!accessToken); // 토큰이 있으면 true로 설정
  }, []);

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
    throw new Error('useAuth는 AuthProvider 내에서만 사용할 수 있습니다.');
  }

  return context; // isLoggedIn과 setIsLoggedIn 반환
};
