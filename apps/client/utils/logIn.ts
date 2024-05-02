import { jwtDecode } from 'jwt-decode';

import { LOGIN } from '@/constants/constant';

export function decodeToken(token: string | undefined): Util.DecodedToken {
  const isTokenValid = token || typeof token == 'string';

  if (!isTokenValid)
    return {
      state: false,
    };

  const decodedToken: Util.JwtPayload = jwtDecode(token);
  const expiration = decodedToken.exp;
  const expirationTime = expiration ? new Date(expiration * 1000) : 0;
  const currentTime = new Date();

  // const expirationTime = new Date(expiration * 1000 - 43140000);
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

export function tokenValidate(logInState: Model.LogInState) {
  const token = logInState[LOGIN.TOKEN_NAME];

  // token이 없을 때 false 반환
  if (!token) return false;

  // token이 있는데 유효한 토큰인지 반환
  return decodeToken(token)?.state;
}
