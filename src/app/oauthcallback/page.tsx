'use client';

import { Suspense } from 'react';

import OauthCallbackHandler from './OauthCallbackHandler';

// TODO 로그인을 이미 했다면 로그인 페이지로 못들어가게 하기

function Oauthcallback() {
  return (
    <Suspense fallback="OauthCallbackHandler">
      <OauthCallbackHandler />
    </Suspense>
  );
}

export default Oauthcallback;
