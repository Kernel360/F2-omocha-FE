import apiClient from '@/apis/queryFunctions/apiClient';
import { LoginParams, ErrorResponse, RegisterParams } from '@/apis/types/Auth';

export const postRegister = (param: RegisterParams) =>
  apiClient.post<ErrorResponse>('/v1/auth/register', param);

export const postLogin = (param: LoginParams) =>
  apiClient.post<ErrorResponse>('/v1/auth/login', param);
