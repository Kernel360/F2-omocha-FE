import createApiClient from '@/apis/queryFunctions/apiClient';
import {
  // LoginParams,
  RegisterParams,
  CheckEmailParams,
  PostRegisterResponseData,
  // PostLoginResponseData,
} from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';

const apiClient = createApiClient();

export const postRegister = (param: RegisterParams) =>
  apiClient.post<Response<PostRegisterResponseData>>('/v2/auth/register', param);

// export const postLogin = (param: LoginParams) => // 안쓰는 것
//   apiClient.post<Response<null>>('/v2/auth/login', param);

export const postLogout = () => apiClient.post<Response<null>>('v2/auth/logout'); // 없어져야할 것

// export const postLogInNew = (param: LoginParams) =>
//   apiClient.post<Response<PostLoginResponseData>>('/v2/auth/login', param);

export const getEmailValidation = async (params: CheckEmailParams) => {
  const response = await apiClient.get<Response<boolean>>('v2/auth/validate-email', {
    params,
  });
  return response.data;
};
