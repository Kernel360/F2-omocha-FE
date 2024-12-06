'use server';

// import deleteCookies from '@/apis/queryFunctions/deleteTokenCookies';
import { setCookies } from '@/utils/setCookies';

import { RefreshParams } from '../types/Auth';

async function setRefreshTokenCookies(params: RefreshParams) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auth/token-reissue`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
    );
    if (!response.ok) {
      // 서버 응답이 실패 상태인 경우 에러 처리
      const errorData = await response.json();

      throw new Error(`Failed to reissue token: ${errorData.message || 'Unknown error'}`);
    }

    const loginData = await response.json();

    const accessToken = loginData.access_token;
    const refreshToken = loginData.refresh_token;

    if (!accessToken || !refreshToken) {
      throw new Error('Invalid response: Missing refresh about tokens');
    }

    setCookies('accessToken', accessToken, { maxAge: 1800 });
    setCookies('refreshToken', refreshToken, { maxAge: 24 * 60 * 60 }); // 24시간

    return { accessToken, refreshToken };
  } catch (error) {
    // deleteCookies(); // 실패
    console.error('Failed to set refresh token cookies:', error);
    throw error;
  }
}

export default setRefreshTokenCookies;
