import { Comment, CommentList } from '@/types';

import { fetchData } from '.';

export const getCommentAPI = (testId: string, page: number) =>
  fetchData<CommentList>(`/api/v1/test/comments/${testId}/page/${page}`, 'GET');

export const postCommentAPI = (headers: Headers, body: object) =>
  fetchData<Comment>(`/api/v1/test/comments`, 'POST', { headers, body });

export const patchCommentAPI = (headers: Headers, body: object) =>
  fetchData<Comment>(`/api/v1/test/comments`, 'PATCH', { headers, body });

export const deleteCommentAPI = (headers: Headers, body: object) =>
  fetchData(`/api/v1/test/comments`, 'DELETE', { headers, body });

export const getCommentCountAPI = (testId: string) => fetchData<number>(`/api/v1/test/${testId}/comments/count`, 'GET');
