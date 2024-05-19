import { MbtiResult, MbtiTestData, MbtiTestListData } from '@/types';

import { fetchData } from '.';

interface ParamsProps {
  page: number;
  size: number;
}

export const getMbtiTestAPI = (testId: string) => fetchData<MbtiTestData>(`/api/v1/tests/test/${testId}`, 'GET');
export const getMbtiTestListAPI = (count: number) => fetchData<MbtiTestListData>(`/api/v1/tests/0/${count}`, 'GET');

// TODO : headers 캐싱
export const getRandomMbtiTestAPI = () => fetchData<MbtiTestData>(`/api/v1/tests/random`, 'GET');

export const getMbtiTestResultAPI = (memberId: string, params: ParamsProps) =>
  fetchData<MbtiResult[]>(`/api/v1/member-test-result/${memberId}`, 'GET', { params });
