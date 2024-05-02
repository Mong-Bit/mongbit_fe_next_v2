import { fetchClient, updateLikeCount } from '@/services';
import { getHeaders } from '@/utils/common';

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

export function sortCommentByDate(data: Model.CommentData[]) {
  // 최신 순으로 정렬한 코멘트 데이터를 return 함
  return [...data].sort((a: Model.CommentData, b: Model.CommentData) => {
    const bValue = new Date(b.commentDate);
    const aValue = new Date(a.commentDate);

    if (bValue > aValue) return 1;
    if (bValue < aValue) return -1;
    return 0;
  });
}
