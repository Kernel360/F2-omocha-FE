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

// ClientToken 타입 정의
interface ClientToken {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

// Context 타입 정의
interface CookiesContextType {
  clientToken: ClientToken;
  setToken: Dispatch<SetStateAction<ClientToken>>;
}

interface CookiesProviderProps {
  children: ReactNode;
  initClientAccessToken: string | undefined;
  initClientRefreshToken: string | undefined;
}

// Context 생성 시 초기값 설정
const CookiesContext = createContext<CookiesContextType | undefined>(undefined);

export function CookiesProvider({
  children,
  initClientAccessToken,
  initClientRefreshToken,
}: CookiesProviderProps) {
  const [clientToken, setToken] = useState({
    accessToken: initClientAccessToken,
    refreshToken: initClientRefreshToken,
  });

  const value = useMemo(
    () => ({
      clientToken,
      setToken,
    }),
    [clientToken],
  );

  return <CookiesContext.Provider value={value}>{children}</CookiesContext.Provider>;
}

export const useCookies = () => {
  const context = useContext(CookiesContext);

  if (!context) {
    throw new Error('useCookies는 CookiesProvider 내에서만 사용할 수 있습니다.');
  }

  return context;
};
