'use server';

import { cookies } from 'next/headers';

function deleteTokenCookies() {
  cookies().set('accessToken', '', {
    maxAge: 0,
  });
}

export default deleteTokenCookies;
