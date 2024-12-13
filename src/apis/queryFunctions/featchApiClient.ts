/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { setCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

import { deleteToken } from '@/utils/deleteToken';

import { FetchError } from '../types/common';

// 에러 키 변환 함수
function normalizeErrorKeys(errorData: Record<string, any>): Record<string, any> {
  return {
    statusCode: errorData.status_code ?? errorData.statusCode,
    resultMsg: errorData.result_msg ?? errorData.resultMsg,
    resultData: errorData.result_data ?? errorData.resultData,
  };
}

const refreshAccessToken = async (refreshToken: string | undefined) => {
  // refreshToken로 재발급 로직임

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auth/token-reissue`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
  ).then(res => res.json());

  if (response.status_code !== 200) {
    throw normalizeErrorKeys(response);
  }

  const newAccessToken = response.result_data.access_token;
  const newRefreshToken = response.result_data.refresh_token;

  setCookie('accessToken', newAccessToken, { maxAge: 60 * 30 });
  setCookie('refreshToken', newRefreshToken, { maxAge: 60 * 60 * 24 });

  return response;
};

interface CreateFetchApiClientProps {
  endpoint: string;
  options?: RequestInit;
  timeout?: number;
  authorizationToken?: { accessToken: string | undefined; refreshToken: string | undefined };
}

async function createFetchApiClient<T>({
  endpoint,
  options,
  authorizationToken,
}: CreateFetchApiClientProps) {
  const url = `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(authorizationToken?.accessToken && {
        Authorization: `${authorizationToken.accessToken}`,
      }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      if (response.status === 401 && authorizationToken?.accessToken) {
        const refreshAccessTokenResponse = await refreshAccessToken(
          authorizationToken?.refreshToken,
        );

        const newAccessToken = refreshAccessTokenResponse.result_data.access_token;
        const newRefreshToken = refreshAccessTokenResponse.result_data.refresh_token;

        if (newAccessToken && newRefreshToken) {
          // 새 accessToken으로 요청 재시도

          defaultOptions.headers = {
            ...defaultOptions.headers,
            Authorization: `${newAccessToken}`,
          };

          const retryResponse = await fetch(url, defaultOptions);

          if (!retryResponse.ok) {
            deleteToken();
            redirect('/login');
          }

          return (await retryResponse.json()) as T;
        }

        const errorData = await response.json();

        throw normalizeErrorKeys(errorData);
      }

      const errorData = await response.json();

      throw normalizeErrorKeys(errorData);
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    console.error(error);
    // {status_code: 400, result_msg: '비밀번호가 일치하지 않습니다.', result_data: null}

    throw normalizeErrorKeys(error as FetchError);
  }
}

export default createFetchApiClient;
