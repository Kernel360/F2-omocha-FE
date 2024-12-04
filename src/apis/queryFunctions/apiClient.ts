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
      console.log('Server==========================================');
      // 서버에서 실행되는 경우
      const { cookies } = await import('next/headers');
      // 쿠키에서 access_token 가져오기
      const accessToken = cookies().get('accessToken')?.value;

      if (accessToken) {
        console.log('token있어=====================================', accessToken);
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = accessToken; // Authorization
      }
    } else {
      console.log('Client==========================================');
      // 클라이언트에서 실행되는 경우
      // 세션 스토리지에서 access_token 가져오기
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = accessToken;
      }
    }
    return config;
  });

  return client;
}

export default createApiClient;
