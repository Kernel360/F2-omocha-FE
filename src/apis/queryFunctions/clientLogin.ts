import { LoginParams } from '../types/Auth';

import login from './login';
// 클라이언트 측의 로그인 함수

export async function clientLogin(params: LoginParams) {
  const { accessToken, refreshToken } = await login(params);

  // 세션 스토리지에 저장
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
}
