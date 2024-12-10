'use server';

import deleteTokenCookies from '@/utils/deleteTokenCookies';

export async function handleLogout() {
  await deleteTokenCookies();
}
