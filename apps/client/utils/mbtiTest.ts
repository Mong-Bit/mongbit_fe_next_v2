import { fetchClient, getLikeState, updateLikeCount } from '@/services';
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

export function doSeeMoreMbtiTests({ fetchOption, data, page }: Util.doSeeMoreMbtiTestsProp) {
  fetchClient(fetchOption).then((response) => {
    const oldMbtiTestData = data.mbtiTestDataList?.testCoverDTOList;
    const newMbtiTestData = oldMbtiTestData ? [...oldMbtiTestData, response?.dataList.testCoverDTOList].flat() : [];

    data.setMbtiTestData((prev: Model.MbtiTest[]) => ({
      ...prev,
      dataList: { hasNextPage: response?.dataList.hasNextPage, testCoverDTOList: newMbtiTestData },
    }));
    page.setPage(page.page + 1);
  });
}
