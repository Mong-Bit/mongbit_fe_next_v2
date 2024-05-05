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

export const PATHS_TEST_ID = (id: string, paths: string) => `/mbti-test/${paths}/${id}`;
export const PATHS_MEMBER_TEST_ID = (id: string, subId: string, paths: string) => `/mbti-test/${paths}/${id}/${subId}`;
