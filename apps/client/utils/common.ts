import { LOGIN } from '@/constants/constant';

export function getHeaders() {
  if (typeof sessionStorage === 'undefined') return;
  return {
    Authorization: sessionStorage.getItem(LOGIN.TOKEN_NAME),
  };
}

export function goPageWithSelector(selector: Util.LogInState, router: any) {
  const url = selector.goPage?.url;

  if (typeof url !== 'string') return;
  if (url.includes('need_login')) router.back();
  return router.push(url);
}
