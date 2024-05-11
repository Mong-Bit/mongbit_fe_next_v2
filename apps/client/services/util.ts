import { LOGIN } from '@/constants/constant';

interface CreateHeadersProrps {
  contnetType?: string;
  cacheControl?: string;
}

// creatHeaders 추가
export const createHeaders = (headerAppend?: CreateHeadersProrps) => {
  const { contnetType, cacheControl } = headerAppend ?? {};
  const headers = new Headers();

  if (typeof sessionStorage === 'undefined') return;

  const loginData = sessionStorage.getItem(LOGIN.MONGBIT);
  const token = loginData ? JSON.parse(loginData).recoil_logIn[LOGIN.TOKEN_NAME] : '';

  headers.append('Content-Type', contnetType || 'application/json');
  headers.append('Cache-Control', cacheControl || 'public');
  headers.append('Authorization', token);

  return headers;
};
