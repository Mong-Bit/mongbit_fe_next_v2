import { jwtDecode } from 'jwt-decode';

import { TOKEN_NAME } from '@/constants/constant';
import { DecodedToken, Token } from '@/types/login';

import { getCookie } from './cookies';

export function getHeaders(): { Authorization?: string } | undefined {
  const token = getCookie(TOKEN_NAME);
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return undefined;
}

export const creatHeaders = (contnetType: string) => {
  const token = getHeaders();
  return {
    'Content-Type': contnetType,
    Authorization: token?.Authorization,
  };
};

export const decodeToken = (token: any) => {
  try {
    const decodedToken: Token = jwtDecode(token);
    const expiration = new Date((decodedToken.exp! + 9 * 3600) * 1000);

    return {
      state: true,
      role: decodedToken.auth,
      exp: decodedToken.exp,
      expires: expiration,
    };
  } catch (error) {
    return {
      state: false,
    };
  }
};

export const decodeToken_csr = () => {
  const token = getCookie(TOKEN_NAME);
  const decodedToken: DecodedToken = decodeToken(token);

  return {
    state: decodedToken.state,
    role: decodedToken.role,
  };
};
