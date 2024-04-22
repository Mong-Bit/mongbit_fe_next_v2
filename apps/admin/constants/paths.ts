export const PATHS = {
  home: '/',
  login: '/login',
  dashboard: '/admin/dashboard',
  contents: '/admin/contents',
  contentsRegister: '/admin/contents/register',
  contentsRegisterMbti: '/admin/contents/register/mbti',
  contentsRegisterSuccess: '/admin/contents/register/success',
  accessDenied403: '/access/denied403',
};

export const PATHS_ID = (id: string) => {
  const contentsEdit = `/admin/contents/${id}/edit`;
  return contentsEdit;
};
