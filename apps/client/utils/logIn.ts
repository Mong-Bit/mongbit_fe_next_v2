import { jwtDecode } from 'jwt-decode';

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
  // console.log('expirationTime::: ', expirationTime);

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

export function isLogIned(logInState: Util.LogInState) {
  const hasToken = logInState.mbToken;
  const isLogIned = decodeToken(hasToken)?.state;
  return isLogIned;
}
