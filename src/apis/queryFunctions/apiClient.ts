import axios from 'axios';

const apiClient = axios.create({
  // baseURL: `${SERVER_API_URL}`,
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  timeout: 100000,
  withCredentials: true,
});

// apiClient.interceptors.request.use((config) => { // 여기서 이제 인터셉토로 토큰이 잘 있는지 확인하기
//   const accessToken = sessionStorage.getItem('accessToken');
//   const { headers } = config;

//   if (headers && accessToken) {
//     headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

export default apiClient;
