import apiClient from '@/apis/queryFunctions/apiClient';
import { LoginParams, RegisterParams, CheckEmailParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';

import devApiClient from './devApiClient';

export const postRegister = (param: RegisterParams) =>
  devApiClient.post<Response<string>>('/v2/auth/register', param);

export const postLogin = (param: LoginParams) =>
  devApiClient.post<Response<string>>('/v2/auth/login', param);

export const postLogout = () => devApiClient.post<Response<null>>('v2/auth/logout');

export const getEmailValidation = async (params: CheckEmailParams) => {
  const response = await apiClient.get<Response<boolean>>('v1/auth/validate-email', {
    params,
  });
  return response.data;
};
