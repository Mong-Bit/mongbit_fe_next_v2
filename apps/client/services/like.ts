import { doApi } from '.';

export const getLikeStateAPI = (testId: string, memberId: string) =>
  doApi({ url: `/api/v1/test/${testId}/${memberId}/like`, method: 'GET' });

export const updateLikeCountAPI = (testId: string, memberId: string, likeState: boolean, headers: Services.Headers) =>
  doApi({ url: `/api/v1/test/${testId}/${memberId}/like`, method: likeState ? 'DELETE' : 'POST', headers });
