import { jwtDecode } from 'jwt-decode';

import { TOKEN_NAME } from '@/constants/constant';
import { DecodedToken } from '@/types/login';

import SessionStorage from './sessionStorage';

export function getHeaders(): { Authorization?: string } | undefined {
  if (typeof SessionStorage === 'undefined') return;
  const token = SessionStorage.getItem(TOKEN_NAME);
  if (token) {
    return {
      Authorization: token,
    };
  }
  return undefined;
}

export function decodeToken() {
  if (typeof sessionStorage === 'undefined') return { state: false };

  const token = SessionStorage.getItem(TOKEN_NAME);

  if (!token) return { state: false };

  const decodedToken: DecodedToken = jwtDecode(token);
  const expiration = decodedToken.exp;
  const expirationTime = new Date(expiration * 1000);
  const currentTime = new Date();

  if (expirationTime < currentTime) {
    return {
      state: false,
    };
  } else {
    return {
      state: true,
      role: decodedToken.auth,
    };
  }
}

export const creatHeaders = (contnetType: string) => {
  const token = getHeaders();
  return {
    'Content-Type': contnetType,
    Authorization: token?.Authorization,
  };
};
