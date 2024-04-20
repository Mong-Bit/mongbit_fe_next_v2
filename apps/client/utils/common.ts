import { LOGIN } from '@/constants/constant';
import { fetchClient } from '@/services';

export function getHeaders() {
  if (typeof sessionStorage === 'undefined') return;
  return {
    Authorization: sessionStorage.getItem(LOGIN.TOKEN_NAME),
  };
}

export function goPageWithSelector(selector: Util.LogInState, router: any) {
  const url = selector.goPage?.url;

  if (typeof url !== 'string') return;
  if (url.includes('need_login')) router.back();
  return router.push(url);
}

export function doSeeMoreMbtiTests({ fetchOption, data, page }: Util.doSeeMoreMbtiTestsProp) {
  fetchClient(fetchOption).then((response) => {
    const oldMbtiTestData = data.mbtiTestDataList.testCoverDTOList;
    const newMbtiTestData = [...oldMbtiTestData, response.dataList.testCoverDTOList].flat();

    data.setMbtiTestData((prev) => ({
      ...prev,
      dataList: { hasNextPage: response.dataList.hasNextPage, testCoverDTOList: newMbtiTestData },
    }));
    page.setPage(page.page + 1);
  });
}

export function formatTimeDifference(dateString: string) {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  targetDate.setHours(targetDate.getHours() + 9);

  const timeDiff = Math.abs(currentDate - targetDate);
  const diffMinutes = Math.floor(timeDiff / (1000 * 60)); // ms를 분 단위로 변환

  if (diffMinutes < 60) {
    if (diffMinutes === 0) return `방금 전`;
    return `${diffMinutes}분 전`;
  } else if (diffMinutes < 24 * 60) {
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}시간 전`;
  } else if (diffMinutes < 24 * 60 * 7) {
    const diffDays = Math.floor(diffMinutes / (60 * 24));
    return `${diffDays}일 전`;
  } else if (diffMinutes < 24 * 60 * 30) {
    const diffWeeks = Math.floor(diffMinutes / (60 * 24 * 7));
    return `${diffWeeks}주 전`;
  } else if (diffMinutes < 24 * 60 * 30 * 12) {
    const diffMonths = Math.floor(diffMinutes / (60 * 24 * 30));
    return `${diffMonths}개월 전`;
  } else {
    const diffYears = Math.floor(diffMinutes / (60 * 24 * 30 * 12));
    return `${diffYears}년 전`;
  }
}
