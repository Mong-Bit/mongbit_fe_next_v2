import { doApi } from '.';

export const getCommentAPI = (testId: string, page: number) =>
  doApi({ url: `/api/v1/test/comments/${testId}/page/${page}`, method: 'GET' });

export const submitCommentAPI = (headers: Services.Headers, body: any) =>
  doApi({ url: `/api/v1/test/comments`, method: 'POST', headers, body });

export const updateCommentAPI = (headers: Services.Headers, body: any) =>
  doApi({ url: `/api/v1/test/comments`, method: 'PATCH', headers, body });

export const deleteCommentAPI = (headers: Services.Headers, body: any) =>
  doApi({ url: `/api/v1/test/comments`, method: 'DELETE', headers, body });
