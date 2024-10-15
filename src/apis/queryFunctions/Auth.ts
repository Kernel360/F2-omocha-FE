import apiClient from '@/apis/queryFunctions/apiClient';
import { LoginParams, RegisterParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';

export const postCheckToken = async () => {
  try {
    const response = await fetch('/apis/set-cookie', { method: 'GET' });

    if (!response.ok) return null;

    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};

export const postRegister = (param: RegisterParams) =>
  apiClient.post<Response<string>>('/v1/auth/register', param);

export const postLogin = (param: LoginParams) =>
  apiClient.post<Response<string>>('/v1/auth/login', param);

export const postGoogleLogin = () => apiClient.post<Response<string>>('/v1/oauth/authorize/google');

export const postNaverLogin = () => apiClient.post<Response<string>>('/v1/oauth/authorize/naver');
