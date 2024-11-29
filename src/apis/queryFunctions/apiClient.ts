import axios from 'axios';

function createApiClient(cookie?: string) {
  const client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api`,
    timeout: 100000,
    withCredentials: true,
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
    },
  });

  client.interceptors.request.use(
    config => {
      // 성공한 요청

      return config;
    },
    error => {
      // 실패한 요청
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    response => {
      // 성공한 응답
      return response;
    },
    error => {
      // 실패한 응답
      return Promise.reject(error);
    },
  );

  return client;
}

export default createApiClient;
