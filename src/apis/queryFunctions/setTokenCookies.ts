'use server';

import { setCookies } from '@/utils/setCookies';

import { LoginParams } from '../types/Auth';

async function setTokenCookies(params: LoginParams) {
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

  setCookies('accessToken', accessToken);

  return { accessToken, refreshToken };
}

export default setTokenCookies;
