import { getCookie } from 'cookies-next';

interface AuthTokens {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

function getAuthTokens(): AuthTokens {
  const accessToken = getCookie('accessToken', { path: '/', domain: 'omocha-acution.com' });
  const refreshToken = getCookie('refreshToken', { path: '/', domain: 'omocha-acution.com' });

  return {
    accessToken,
    refreshToken,
  };
}

export default getAuthTokens;
