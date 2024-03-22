import { apiBe_v1 } from '.';

import { MbtiTest, TestCover } from '@/types/test';
import { getHeaders } from '@/utils/utils';

const headers = getHeaders();

export const getContentListAPI = () =>
  apiBe_v1<TestCover[]>(`tests`, {
    headers,
  });

export const getContentAPI = (testId: string) =>
  apiBe_v1<MbtiTest>(`tests/test/${testId}`, {
    headers,
  });

export const getCommentCountAPI = (testId: string) =>
  apiBe_v1<number>(`test/${testId}/comments/count`, {
    headers,
  });

export const getSharesCountAPI = (testId: string) =>
  apiBe_v1<number>(`tests/${testId}/shares/count`, {
    headers,
  });

export const getLinkCountAPI = (testId: string) =>
  apiBe_v1<number>(`tests/${testId}/shares/count/type`, {
    params: {
      type: 'LINK',
    },
    headers,
  });

export const deleteContentAPI = (testId: string) =>
  apiBe_v1.delete(`tests/test/${testId}`, {
    headers,
  });
