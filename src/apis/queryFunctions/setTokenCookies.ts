'use server';

import { LoginParams } from '../types/Auth';

async function setTokenCookies(params: LoginParams) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      // 서버 응답이 실패 상태인 경우 에러 처리
      const errorData = await response.json();

      throw new Error(`Failed to reissue token: ${errorData.message || 'Unknown error'}`);
    }

    const loginData = await response.json();

    const accessToken = loginData.result_data?.access_token;
    const refreshToken = loginData.result_data?.refresh_token;

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Failed to bring token:', error);
    throw error; // 호출자에게 에러 전달
  }
}

export default setTokenCookies;
