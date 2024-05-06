export const PATHS = {
  home: '/',
  login: '/login',
  dashboard: '/admin/dashboard',
  contents: '/admin/contents',
  contentsRegister: '/admin/contents/register',
  contentsRegisterMbti: '/admin/contents/register/mbti',
  contentsRegisterSuccess: '/admin/contents/register/success',
  accessDenied403: '/access/denied403',
  accessDenied404: '/access/denied404',
  accessDenied500: '/access/denied500',
};

export const PATHS_ID = (id: string, paths: string) => `/admin/contents/${id}/${paths}`;

export const PATHS_ACCESS_DENIED = (state: number) => `/access/denied${state}`;

export const EDIT = 'edit';
export const DETALIS = 'detalis';
