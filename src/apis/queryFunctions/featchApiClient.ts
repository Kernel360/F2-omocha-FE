import { deleteCookie, setCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

const refreshAccessToken = async (refreshToken: string | undefined) => {
  // refreshToken로 재발급 로직임
  if (!refreshToken) {
    throw new Error('엑세스 토큰이 없음 재로그인 필요');
  }

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
    throw new Error('엑세스 토큰도 상했음 재로그인 필요');
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
}: CreateFetchApiClientProps): Promise<T> {
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
      if (response.status === 401) {
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
            // 새 토큰으로 재요청 했는데 안댐 로그아웃 해야함
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            redirect('/login');
          }

          return (await retryResponse.json()) as T;
        }

        throw new Error('Network response was not ok');
      }

      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default createFetchApiClient;
