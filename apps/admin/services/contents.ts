import { ContentsCover, LatestTestCover, MbtiTest } from '@/types/test';
import { getHeaders } from '@/utils/utils';

import { apiBe_v1, apiBe_v2 } from '.';

const headers = getHeaders();

export const getContentsAPI = (page: number, size: number) =>
  apiBe_v2<ContentsCover>(`contents/content`, {
    params: {
      page: page,
      size: size,
    },
    headers,
  });

export const getTotalCountAPI = () => apiBe_v2(`metrics/total`, { headers });

export const getContentAPI = (testId: string) =>
  apiBe_v1<MbtiTest>(`tests/test/${testId}`, {
    headers,
  });

export const getLatestContentAPI = (page: number, size: number) =>
  apiBe_v1<LatestTestCover>(`tests/${page}/${size}`, { headers });

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
