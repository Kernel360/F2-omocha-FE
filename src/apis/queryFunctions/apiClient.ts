import axios from 'axios';

const isServer = typeof window === 'undefined';

function createApiClient() {
  const client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api`,
    timeout: 100000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(async config => {
    if (isServer) {
      // 서버에서 실행되는 경우에는 인가가 필요없는 요청만 가능합니다.
    } else {
      // 클라이언트에서 실행되는 경우에는 스토리지에서 access_token 가져옵니다.
      const accessToken = sessionStorage.getItem('accessToken');

      if (accessToken && !config.headers.Authorization) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = accessToken;
      }
    }
    return config;
  });

  client.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const refreshToken = localStorage.getItem('refreshToken');
      const originalRequest = error.config;

      if (error.response?.status === 401) {
        if (refreshToken) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auth/token-reissue`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
              },
            );
            if (response.ok) {
              const data = await response.json();
              const newAccessToken = data.result_data?.access_token;
              const newRefreshToken = data.result_data?.refresh_token;

              localStorage.setItem('refreshToken', newRefreshToken);
              sessionStorage.setItem('accessToken', newAccessToken);

              originalRequest.headers.Authorization = newAccessToken;
              return await client(originalRequest);
            }

            console.error('refreshToken도 만료되었습니다.');
            alert('재로그인이 필요합니다.');
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('accessToken');
            window.location.href = '/login';
          } catch (e) {
            alert('재로그인이 필요합니다.');
            console.error('accessToken 재발급 실패');
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('accessToken');
            window.location.href = '/login';
          }
        }
      }
      return Promise.reject(error);
    },
  );

  return client;
}

export default createApiClient;
