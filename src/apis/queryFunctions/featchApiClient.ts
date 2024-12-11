'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Response as CustomResponse } from '@/apis/types/common';
import deleteTokenCookies from '@/utils/deleteTokenCookies';
import { setCookies } from '@/utils/setCookies';

import { PostLoginResponseData } from '../types/Auth';

function fetchWithTimeout(url: string, options: RequestInit, timeout = 10000): Promise<Response> {
  return Promise.race([
    fetch(url, options).then(response => {
      return response;
    }),
    new Promise<Response>((_, reject) =>
      // eslint-disable-next-line no-promise-executor-return
      setTimeout(() => reject(new Error('Request timed out')), timeout),
    ),
  ]);
}

async function createFetchApiClient<T>(
  endpoint: string,
  options: RequestInit = {},
  timeout = 10000,
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api${endpoint}`;

  const accessToken = cookies().get('accessToken')?.value;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `${accessToken}` }),
    },
    credentials: 'include',
    ...options,
  };

  const refreshAccessToken = async () => {
    const refreshToken = cookies().get('refreshToken')?.value;

    if (!refreshToken) {
      deleteTokenCookies();
      redirect('/login');
    }

    const response = await createFetchApiClient<CustomResponse<PostLoginResponseData>>(
      '/v2/auth/token-reissue',
      {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
      },
    );

    if (!response) {
      deleteTokenCookies();
      redirect('/login');
      throw new Error('Failed to refreshAccessToken');
    }

    const newAccessToken = response.result_data.access_token;
    const newRefreshToken = response.result_data.refresh_token;

    setCookies('accessToken', newAccessToken);
    setCookies('refreshToken', newRefreshToken);

    return response;
  };

  try {
    const response = await fetchWithTimeout(url, defaultOptions, timeout);

    if (!response.ok) {
      console.log('response.status', response.status);
      if (response.status === 401) {
        console.log('401 error');
        const refreshAccessTokenResponse = await refreshAccessToken();

        const newAccessToken = refreshAccessTokenResponse.result_data.access_token;
        const newRefreshToken = refreshAccessTokenResponse.result_data.refresh_token;
        // 여기서 토큰을 새로 refreshAccessTokenResponse

        if (newAccessToken && newRefreshToken) {
          // 새 accessToken으로 요청 재시도
          defaultOptions.headers = {
            ...defaultOptions.headers,
            Authorization: `${accessToken}`,
          };

          const retryResponse = await fetchWithTimeout(url, defaultOptions, timeout);

          if (!retryResponse.ok) {
            throw new Error('Retry request failed');
          }

          return (await retryResponse.json()) as T;
        }

        deleteTokenCookies();
        redirect('/login');
        throw new Error('Session expired. Please log in again.');
      }

      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Fetch error:', error);
    deleteTokenCookies();
    redirect('/login');
    throw error;
  }
}

export default createFetchApiClient;
