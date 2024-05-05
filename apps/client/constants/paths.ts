export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  LATEST: '/mbti-test/latest',
  TOTAL: '/mbti-test/total',
  RANDOM: '/mbti-test/random',
  MY_PAGE: '/mypage',
  POLICY: '/policy',
  TERMS: '/terms',
};

export const PREVIEW = 'preview';
export const RESULT = 'result';

export const PATHS_ID = (id: string, paths: string) => `/mbti-test/${id}/${paths}`;
