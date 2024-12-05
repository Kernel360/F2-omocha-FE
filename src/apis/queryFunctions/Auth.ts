import createApiClient from '@/apis/queryFunctions/apiClient';
import {
  RegisterParams,
  CheckEmailParams,
  PostRegisterResponseData,
  PostEmailAuthParams,
  CheckEmailAuthParams,
} from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';

const apiClient = createApiClient();

export const postRegister = (param: RegisterParams) =>
  apiClient.post<Response<PostRegisterResponseData>>('/v2/auth/register', param);

export const postLogout = () => apiClient.post<Response<null>>('v2/auth/logout'); // 없어져야할 것

export const getEmailValidation = async (params: CheckEmailParams) => {
  const response = await apiClient.get<Response<boolean>>('v2/auth/validate-email', {
    params,
  });
  return response.data;
};

export const postEmailAuth = async (params: PostEmailAuthParams) => {
  const response = await apiClient.post<Response<null>>('v2/mail', params);
  return response.data;
};

export const postEmailValidationCode = async (params: CheckEmailAuthParams) => {
  const response = await apiClient.post<Response<boolean>>('v2/mail/code', params);
  return response.data;
};
