import { deleteCookie } from 'cookies-next';

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

import createFetchApiClient from './featchApiClient';

export const postLogin = async (params: LoginParams) => {
  const response = await createFetchApiClient<Response<PostLoginResponseData>>({
    endpoint: '/v2/auth/login',
    options: {
      method: 'POST',
      body: JSON.stringify(params),
    },
  });

  if (!response) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    throw new Error('Failed to postLogin');
  }

  return response;
};

// ---------
// 이메일 인증 관련 API

export const postEmailValidationCode = async (params: CheckEmailAuthParams) => {
  const response = await createFetchApiClient<Response<boolean>>({
    endpoint: '/v2/mail/code',
    options: {
      method: 'POST',
      body: JSON.stringify(params),
    },
  });
  if (!response) {
    throw new Error('Failed to postEmailValidationCode');
  }
  return response;
};

export const postEmailAuth = async (params: PostEmailAuthParams) => {
  const response = await createFetchApiClient<Response<null>>({
    endpoint: '/v2/mail',
    options: {
      method: 'POST',
      body: JSON.stringify(params),
    },
  });

  if (!response) {
    throw new Error('Failed to postEmailAuth');
  }

  return response;
};

export const getEmailValidation = async (params: CheckEmailParams) => {
  const response = await createFetchApiClient<Response<boolean>>({
    endpoint: `/v2/auth/validate-email/${params.email}`,
  });
  if (!response) {
    throw new Error('Failed to getEmailValidation');
  }

  return response;
};

export const postRegister = async (param: RegisterParams) => {
  const response = await createFetchApiClient<Response<PostRegisterResponseData>>({
    endpoint: '/v2/auth/register',
    options: {
      method: 'POST',
      body: JSON.stringify(param),
    },
  });

  if (!response) {
    throw new Error('Failed to postRegister');
  }

  return response;
};
