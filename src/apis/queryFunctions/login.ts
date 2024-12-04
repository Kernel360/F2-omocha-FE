'use server';

import { setCookie } from '@/utils/cookies';

import { LoginParams } from '../types/Auth';

async function login(params: LoginParams) {
  const loginData = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then(res => res.json())
    .then(jsonRes => jsonRes.result_data);

  const accessToken = loginData.access_token;
  const refreshToken = loginData.refresh_token;

  setCookie('accessToken', accessToken);

  return { accessToken, refreshToken };
}

export default login;
