import { fetchData } from '.';

interface updateLikeCountAPIProps {
  testId: string;
  memberId: string;
  likeState: boolean;
  headers: Headers;
}

export const getLikeStateAPI = (testId: string, memberId: string) =>
  fetchData(`/api/v1/test/${testId}/${memberId}/like`, 'GET');

export const updateLikeCountAPI = ({ testId, memberId, likeState, headers }: updateLikeCountAPIProps) =>
  fetchData(`/api/v1/test/${testId}/${memberId}/like`, likeState ? 'DELETE' : 'POST', { headers });
