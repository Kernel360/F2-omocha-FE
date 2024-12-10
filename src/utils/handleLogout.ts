'use server';

import deleteTokenCookies from '@/utils/deleteTokenCookies';

export function handleLogout() {
  deleteTokenCookies();
}
