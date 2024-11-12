import axios from 'axios';

const devApiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_DEV_API_URL}/api`,
  timeout: 100000,
  withCredentials: true,
});

devApiClient.interceptors.request.use(
  config => {
    // 성공한 요청

    return config;
  },
  error => {
    // 실패한 요청
    return Promise.reject(error);
  },
);

devApiClient.interceptors.response.use(
  response => {
    // 성공한 응답
    return response;
  },
  error => {
    // 실패한 응답
    return Promise.reject(error);
  },
);

export default devApiClient;
