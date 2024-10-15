import apiClient from '@/apis/queryFunctions/apiClient';
import { LoginParams, RegisterParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';

export const postRegister = (param: RegisterParams) =>
  apiClient.post<Response<string>>('/v1/auth/register', param);

export const postLogin = (param: LoginParams) =>
  apiClient.post<Response<string>>('/v1/auth/login', param);

export const postGoogleLogin = () => apiClient.post<Response<string>>('/v1/oauth/authorize/google');

export const postNaverLogin = () => apiClient.post<Response<string>>('/v1/oauth/authorize/naver');
