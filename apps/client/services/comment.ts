import { fetchData } from '.';

export const getCommentAPI = (testId: string, page: number) =>
  fetchData(`/api/v1/test/comments/${testId}/page/${page}`, 'GET');

export const submitCommentAPI = (headers: Headers, body: object) =>
  fetchData(`/api/v1/test/comments`, 'POST', { headers, body });

export const updateCommentAPI = (headers: Headers, body: object) =>
  fetchData(`/api/v1/test/comments`, 'PATCH', { headers, body });

export const deleteCommentAPI = (headers: Headers, body: object) =>
  fetchData(`/api/v1/test/comments`, 'DELETE', { headers, body });
