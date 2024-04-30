import { getLikeState, updateLikeCount } from '@/services';
import { getHeaders } from '@/utils/common';

export function setLikeButtonColor(
  testId: Util.TestId,
  memberId: Util.MemberId,
  setLikeState: React.Dispatch<React.SetStateAction<boolean>>,
) {
  getLikeState(testId, memberId).then((response) => setLikeState(response?.dataList));
}

export function updateLikeNumber(likeState: Util.LikeState, testId: Util.TestId, memberId: Util.MemberId) {
  const headers = getHeaders();
  updateLikeCount(testId, memberId, likeState, headers);
}
