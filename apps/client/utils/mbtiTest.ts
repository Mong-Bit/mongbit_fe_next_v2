import { DOMAIN_FE_PROD } from '@/constants/constant';
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

export function sortCommentByDate(data: Base.MbtiTestCommentData[]) {
  // 코멘트를 최신 순으로 정렬
  data.sort((a: Base.MbtiTestCommentData, b: Base.MbtiTestCommentData) => {
    const bValue = new Date(b.commentDate);
    const aValue = new Date(a.commentDate);

    if (bValue > aValue) return 1;
    if (bValue < aValue) return -1;
    return 0;
  });
}

export function shareToKakaotalk_mbtiTest(
  mbtiTestId: string | null,
  memberId: string,
  type: string,
  title: string,
  mbtiTestImgUri: string,
  likeCnt: number | null,
) {
  if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: 'MBTI 심테는 "몽빗"에서✨',
      description: title,
      imageUrl: mbtiTestImgUri,
      link: {
        mobileWebUrl: `${DOMAIN_FE_PROD}/mbti-test/preview/${mbtiTestId}`,
        webUrl: `${DOMAIN_FE_PROD}/mbti-test/preview/${mbtiTestId}`,
      },
    },
    social: {
      likeCount: likeCnt,
    },
    buttons: [
      {
        title: '테스트 하러 가기',
        link: {
          mobileWebUrl: `${DOMAIN_FE_PROD}/mbti-test/preview/${mbtiTestId}`,
          webUrl: `${DOMAIN_FE_PROD}/mbti-test/preview/${mbtiTestId}`,
        },
      },
    ],
    serverCallbackArgs: `{"mbtiTestId": "${mbtiTestId}", "memberId": "${memberId}", "type": "${type}"}`,
  });
}
