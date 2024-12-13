'use server';

import OauthCallbackHandler from './OauthCallbackHandler';

async function Oauthcallback({ searchParams }: { searchParams: { [key: string]: string } }) {
  const accessToken = searchParams.access_token;
  const refreshToken = searchParams.refresh_token;

  return <OauthCallbackHandler accessToken={accessToken} refreshToken={refreshToken} />;
}

export default Oauthcallback;
