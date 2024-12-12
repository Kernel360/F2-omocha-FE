import { deleteCookie } from 'cookies-next';

export function handleLogout() {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
}
