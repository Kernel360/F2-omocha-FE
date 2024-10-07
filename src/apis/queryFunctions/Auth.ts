import apiClient from '@/apis/queryFunctions/apiClient';
import { LoginParams, RegisterParams } from '@/apis/types/Auth';

export const postRegister = (param: RegisterParams) =>
  apiClient.post<RegisterParams>('/v1/auth/register', param);

export const postLogin = (param: LoginParams) =>
  apiClient.post<LoginParams>('/v1/auth/login', param);
