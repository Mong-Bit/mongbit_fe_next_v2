import { fetchData } from '.';

export const getMbtiTestAPI = (testId: string) => fetchData(`/api/v1/tests/test/${testId}`, 'GET');
export const getMbtiTestListAPI = (count: number) => fetchData(`/api/v1/tests/0/${count}`, 'GET');

export const getLatestMbtiTestListAPI = (count: number) => fetchData(`/api/v1/tests/0/${count}`, 'GET');

interface ParamsProps {
  page: number;
  size: number;
}

// TODO : headers 캐싱
export const getRandomMbtiTestAPI = () => fetchData(`/api/v1/tests/random`, 'GET');

export const getMbtiTestResultAPI = (memberId: string, params: ParamsProps) =>
  fetchData(`/api/v1/member-test-result/${memberId}`, 'GET', { params });
