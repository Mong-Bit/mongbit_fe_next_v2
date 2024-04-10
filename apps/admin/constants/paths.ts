// TODO: 경로 정리
export const Paths = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  contents: '/contents',
  contentsRegister: '/contents/register',
  contentsRegisterMbti: '/contents/register/mbti',
  contentsRegisterSuccess: '/contents/register/success',
};

export const PathsId = (id: string) => {
  const contentsEdit = `/contents/${id}/edit`;

  return contentsEdit;
};
