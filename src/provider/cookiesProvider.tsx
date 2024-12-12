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

import { getCookie } from 'cookies-next';

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

  const accessToken = getCookie('accessToken', { path: '/', domain: 'omocha-acution.com' });
  const refreshToken = getCookie('refreshToken', { path: '/', domain: 'omocha-acution.com' });

  console.log('initClientAccessToken', initClientAccessToken);
  console.log('initClientRefreshToken', initClientRefreshToken);
  console.log('accessToken initClientAccessToken', accessToken);
  console.log('refreshToken initClientRefreshToken', refreshToken);
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

// 'use client';

// import {
//   createContext,
//   useContext,
//   ReactNode,
//   useMemo,
//   useState,
//   Dispatch,
//   SetStateAction,
//   useEffect,
// } from 'react';

// import { getCookie } from 'cookies-next';
// import { useAuth } from './authProvider';

// // ClientToken 타입 정의
// interface ClientToken {
//   accessToken: string | undefined;
//   refreshToken: string | undefined;
// }

// // Context 타입 정의
// interface CookiesContextType {
//   clientToken: ClientToken;
//   setToken: Dispatch<SetStateAction<ClientToken>>;
// }

// interface CookiesProviderProps {
//   children: ReactNode;
// }

// // Context 생성 시 초기값 설정
// const CookiesContext = createContext<CookiesContextType | undefined>(undefined);

// export function CookiesProvider({ children }: CookiesProviderProps) {
//   const [clientToken, setToken] = useState<ClientToken>({
//     accessToken: undefined,
//     refreshToken: undefined,
//   });

//   console.log('initClientAccessToken', clientToken.accessToken);
//   console.log('initClientRefreshToken', clientToken.refreshToken);

//   const value = useMemo(
//     () => ({
//       clientToken,
//       setToken,
//     }),
//     [clientToken],
//   );

//   return <CookiesContext.Provider value={value}>{children}</CookiesContext.Provider>;
// }

// export const useCookies = () => {
//   const context = useContext(CookiesContext);

//   if (!context) {
//     throw new Error('useCookies는 CookiesProvider 내에서만 사용할 수 있습니다.');
//   }

//   return context;
// };
