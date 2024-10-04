import apiClient from '@/apis/index';
import { LoginParams, RegisterParams } from '@/apis/types/Auth';

export const register = (param: RegisterParams) =>
  apiClient.post<RegisterParams>('/v1/auth/register', param);

export const login = (param: LoginParams) => apiClient.post<LoginParams>('/v1/auth/login', param);
