'use server';

import {
  CheckEmailAuthParams,
  CheckEmailParams,
  LoginParams,
  PostEmailAuthParams,
  PostLoginResponseData,
  PostRegisterResponseData,
  RegisterParams,
} from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';
import deleteTokenCookies from '@/utils/deleteTokenCookies';
import { setCookies } from '@/utils/setCookies';

import createFetchApiClient from './featchApiClient';

export const postLogin = async (params: LoginParams) => {
  const response = await createFetchApiClient<Response<PostLoginResponseData>>('/v2/auth/login', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  if (!response) {
    deleteTokenCookies();
    throw new Error('Failed to postLogin');
  }

  const accessToken = response.result_data.access_token;
  const refreshToken = response.result_data.refresh_token;

  if (accessToken && refreshToken) {
    setCookies('accessToken', response.result_data.access_token);
    setCookies('refreshToken', response.result_data.refresh_token);
  }
  return response;
};

export const postEmailValidationCode = async (params: CheckEmailAuthParams) => {
  const response = await createFetchApiClient<Response<boolean>>('/v2/mail/code', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  if (!response) {
    throw new Error('Failed to postEmailValidationCode');
  }
  return response;
};

export const postEmailAuth = async (params: PostEmailAuthParams) => {
  const response = await createFetchApiClient<Response<null>>('/v2/mail', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  if (!response) {
    throw new Error('Failed to postEmailAuth');
  }

  return response;
};

export const getEmailValidation = async (params: CheckEmailParams) => {
  // 얘는 왜 get인데 body에 담겨가죠?
  const response = await createFetchApiClient<Response<boolean>>('/v2/auth/validate-email', {
    method: 'GET',
    body: JSON.stringify(params),
  });

  if (!response) {
    throw new Error('Failed to getEmailValidation');
  }

  return response;
};

export const postRegister = async (param: RegisterParams) => {
  const response = await createFetchApiClient<Response<PostRegisterResponseData>>(
    '/v2/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(param),
    },
  );

  if (!response) {
    throw new Error('Failed to postRegister');
  }

  return response;
};
