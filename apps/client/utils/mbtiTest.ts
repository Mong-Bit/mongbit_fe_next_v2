import { fetchClient } from '@/services';
import { getHeaders } from '@/utils/common';

export function setLikeButtonColor(
  testId: Util.TestId,
  memberId: Util.MemberId,
  setLikeState: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const fetchOption = {
    url: `/api/v1/test/${testId}/${memberId}/like`,
    method: 'GET',
  };

  fetchClient(fetchOption).then((response) => {
    setLikeState(response?.dataList);
  });
}

export function updateLikeCount(likeState: Util.LikeState, testId: Util.TestId, memberId: Util.MemberId) {
  const headers = getHeaders();

  const fetchOption = {
    url: `/api/v1/test/${testId}/${memberId}/like`,
    method: likeState ? 'DELETE' : 'POST',
    headers,
  };
  fetchClient(fetchOption);
}
