export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  LATEST: '/mbti-test/latest',
  TOTAL: '/mbti-test/total',
  RANDOM: '/mbti-test/random',
  PREVIEW: '/preview',
  PLAY: '/play',
  MY_PAGE: '/mypage',
  POLICY: '/policy',
  TERMS: '/terms',
};

export const PREVIEW = 'preview';
export const RESULT = 'result';

export const getTestIdPath = (id: string, paths: string) => `/mbti-test/${id}/${paths}`;
export const getMemberTestIdPath = (id: string, subId: string, paths: string) => `/mbti-test/${paths}/${id}/${subId}`;
