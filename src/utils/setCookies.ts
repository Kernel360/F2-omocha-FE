import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export const setCookies = (key: string, value: string, options?: Partial<ResponseCookie>) => {
  return cookies().set(key, value, {
    ...options,
    maxAge: 1800, // 30분
    httpOnly: true,
  });
};
