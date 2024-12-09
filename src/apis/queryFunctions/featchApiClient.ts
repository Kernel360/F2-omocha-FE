'use server';

import { cookies } from 'next/headers';

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api`;

function fetchWithTimeout(url: string, options: RequestInit, timeout = 10000): Promise<Response> {
  return Promise.race([
    fetch(url, options),
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
  const url = `${BASE_URL}${endpoint}`;

  const accessToken = cookies().get('accessToken')?.value;
  // const refreshToken = cookies().get('refreshToken')?.value;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `${accessToken}` }),
    },
    credentials: 'include', // withCredentials: true와 동일
    ...options,
  };

  try {
    const response = await fetchWithTimeout(url, defaultOptions, timeout);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || 'Network response was not ok');
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export default createFetchApiClient;
