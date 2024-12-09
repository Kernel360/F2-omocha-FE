'use client';

import { Suspense } from 'react';

import OauthCallbackHandler from './OauthCallbackHandler';

function Oauthcallback() {
  return (
    <Suspense fallback="OauthCallbackHandler">
      <OauthCallbackHandler />
    </Suspense>
  );
}

export default Oauthcallback;
