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

interface CookiesContextType {
  clientAccessToken: string | undefined;
  setClientAccessToken: Dispatch<SetStateAction<string | undefined>>; // isSetLoggedIn을 상태 변경 함수로 포함
}

interface CookiesProviderProps {
  children: ReactNode;
  initClientAccessToken?: string;
}

const CookiesContext = createContext<CookiesContextType | undefined>(undefined);

export function CookiesProvider({ children, initClientAccessToken }: CookiesProviderProps) {
  const [clientAccessToken, setClientAccessToken] = useState(initClientAccessToken);

  const value = useMemo(
    () => ({
      clientAccessToken,
      setClientAccessToken,
    }),
    [clientAccessToken],
  );

  return <CookiesContext.Provider value={value}>{children}</CookiesContext.Provider>;
}

export const useCookies = () => {
  const context = useContext(CookiesContext);

  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서만 사용할 수 있습니다.');
  }

  return context; // isLoggedIn과 setIsLoggedIn 반환
};
