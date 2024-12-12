import { deleteCookie } from 'cookies-next';

export function deleteToken() {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
}
