import { DOMAIN_FE_PROD, LOGIN, MESSAGE } from '@/constants/constant';
import { PATHS, PATHS_TEST_ID } from '@/constants/paths';
import { fetchClient, updateLikeCount } from '@/services';
import { checkCommentAddValidity, getHeaders } from '@/utils/common';

import { tokenValidate } from './login';

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

export function shareToKakaotalk_mbtiTest(
  mbtiTestId: string,
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
        mobileWebUrl: `${DOMAIN_FE_PROD}${PATHS_TEST_ID(mbtiTestId, PATHS.PREVIEW)}`,
        webUrl: `${DOMAIN_FE_PROD}${PATHS_TEST_ID(mbtiTestId, PATHS.PREVIEW)}`,
      },
    },
    social: {
      likeCount: likeCnt,
    },
    buttons: [
      {
        title: '테스트 하러 가기',
        link: {
          mobileWebUrl: `${DOMAIN_FE_PROD}${PATHS_TEST_ID(mbtiTestId, PATHS.PREVIEW)}`,
          webUrl: `${DOMAIN_FE_PROD}${PATHS_TEST_ID(mbtiTestId, PATHS.PREVIEW)}`,
        },
      },
    ],
    serverCallbackArgs: `{"mbtiTestId": "${mbtiTestId}", "memberId": "${memberId}", "type": "${type}"}`,
  });
}

export function validationBeforeWriteComment(loginState: Model.LogInState, router: any) {
  let result = true;
  const isTokenValid = tokenValidate(loginState);
  const prevCommentAddedDate = loginState[LOGIN.LAST_COMMENT_TIME] ? new Date(loginState.mbLastCommentTime) : null;
  const canAddComment = checkCommentAddValidity(new Date(), prevCommentAddedDate);

  if (!isTokenValid) {
    router.push('/login');
    return (result = false);
  }
  if (!canAddComment) {
    alert(MESSAGE.COMMENT_TIME);
    return (result = false);
  }

  return result;
}

export function makeScore(array: number[]) {
  const part_1 = array[0] + array[1] + array[2];
  const part_2 = array[3] + array[4] + array[5];
  const part_3 = array[6] + array[7] + array[8];
  const part_4 = array[9] + array[10] + array[11];

  return [part_1, part_2, part_3, part_4];
}
