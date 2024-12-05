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
      // 서버에서 실행되는 경우에는 쿠키에서 access_token 가져옵니다.
      const { cookies } = await import('next/headers');
      const accessToken = cookies().get('accessToken')?.value;

      if (accessToken && !config.headers.Authorization) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = accessToken;
      }
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

  return client;
}

export default createApiClient;
