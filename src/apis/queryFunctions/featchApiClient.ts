import { deleteCookie, setCookie } from 'cookies-next';

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

const refreshAccessToken = async (refreshToken: string | undefined) => {
  console.log('refreshToken in refreshToken');
  console.log('확인이 필요해요ㅑ refreshAccessToken', refreshToken);

  if (!refreshToken) {
    console.log('refreshToken is not exist');
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    // 페이지 이동 필요
  }

  console.log('refreshToken kin refreshAccessToken', refreshToken);

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

  if (response.result_code !== 200) {
    console.log('refreshToken is not exist');
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    // 페이지 이동 필요

    throw new Error('Failed to refreshAccessToken');
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
  timeout,
  authorizationToken,
}: CreateFetchApiClientProps): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api${endpoint}`;

  // const accessToken = getCookie('accessToken');

  // const { accessToken } = authorizationToken;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(authorizationToken?.accessToken && {
        Authorization: `${authorizationToken.accessToken}`,
      }),
    },
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetchWithTimeout(url, defaultOptions, timeout);

    if (!response.ok) {
      console.log('response.status', response.status);
      if (response.status === 401) {
        console.log('401 error 401 error 401 error 401 error 401 error 401 error 401 error');

        const refreshAccessTokenResponse = await refreshAccessToken(
          authorizationToken?.refreshToken,
        );

        const newAccessToken = refreshAccessTokenResponse.result_data.access_token;
        const newRefreshToken = refreshAccessTokenResponse.result_data.refresh_token;
        // 여기서 토큰을 새로 refreshAccessTokenResponse

        if (newAccessToken && newRefreshToken) {
          console.log(
            '새 accessToken으로 요청 재시도 새 accessToken으로 요청 재시도 새 accessToken으로 요청 재시도 새 accessToken으로 요청 재시도',
          );
          // 새 accessToken으로 요청 재시도
          defaultOptions.headers = {
            ...defaultOptions.headers,
            Authorization: `${newAccessToken}`,
          };

          const retryResponse = await fetchWithTimeout(url, defaultOptions, timeout);

          if (!retryResponse.ok) {
            throw new Error('Retry request failed');
          }

          return (await retryResponse.json()) as T;
        }

        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        // 페이지 이동 필요

        throw new Error('Session expired. Please log in again.');
      }

      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Fetch error:', error);

    // deleteCookie('accessToken');
    // deleteCookie('refreshToken');
    // 페이지 이동 필요

    throw error;
  }
}

export default createFetchApiClient;
