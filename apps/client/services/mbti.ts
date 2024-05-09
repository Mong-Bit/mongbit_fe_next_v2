import { doApi } from '.';

export const getMbtiTestAPI = (testId: string) => doApi({ url: `/api/v1/tests/test/${testId}`, method: 'GET' });
export const getMbtiTestListAPI = (count: number) => doApi({ url: `/api/v1/tests/0/${count}`, method: 'GET' });

export const getLatestMbtiTestListAPI = (count: number) => doApi({ url: `/api/v1/tests/0/${count}`, method: 'GET' });

// TODO : headers 캐싱
export const getRandomMbtiTestAPI = () => doApi({ url: `/api/v1/tests/random`, method: 'GET' });

// TODO : params 추가
export const getMbtiTestResultAPI = ({ memberId, page, size }: { memberId: string; page: number; size: number }) =>
  doApi({ url: `/api/v1/member-test-result/${memberId}`, method: 'GET' }, { params: { page: page, size: size } });
