import { LOGIN } from '@/constants/constant';
import { fetchClient } from '@/services';

export function getHeaders() {
  if (typeof sessionStorage === 'undefined') return;
  const sessionStorageDataString = sessionStorage.getItem(LOGIN.MONGBIT);

  const json = sessionStorageDataString ? JSON.parse(sessionStorageDataString) : null;
  const token = json ? json.recoil_logIn[LOGIN.TOKEN_NAME] : '';
  return {
    Authorization: token,
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
    const oldMbtiTestData = data.mbtiTestDataList?.testCoverDTOList;
    const newMbtiTestData = oldMbtiTestData ? [...oldMbtiTestData, response?.dataList.testCoverDTOList].flat() : [];

    data.setMbtiTestData((prev: Model.MbtiTest[]) => ({
      ...prev,
      dataList: { hasNextPage: response?.dataList.hasNextPage, testCoverDTOList: newMbtiTestData },
    }));
    page.setPage(page.page + 1);
  });
}

export function formatTimeDifference(dateString: string) {
  const currentDate: Date = new Date();
  const targetDate: Date = new Date(dateString);

  targetDate.setHours(targetDate.getHours() + 9);

  const timeDiff: number = Math.abs(currentDate.getTime() - targetDate.getTime()); // getTime() 메서드를 사용하여 밀리초 단위로 변환
  const diffMinutes: number = Math.floor(timeDiff / (1000 * 60)); // ms를 분 단위로 변환
  let value;

  switch (true) {
    case diffMinutes < 60:
      if (diffMinutes === 0) return `방금 전`;
      return `${diffMinutes}분 전`;
    case diffMinutes < 24 * 60:
      value = Math.floor(diffMinutes / 60);
      return `${value}시간 전`;
    case diffMinutes < 24 * 60 * 7:
      value = Math.floor(diffMinutes / (60 * 24));
      return `${value}일 전`;
    case diffMinutes < 24 * 60 * 30:
      value = Math.floor(diffMinutes / (60 * 24 * 7));
      return `${value}주 전`;
    case diffMinutes < 24 * 60 * 30 * 12:
      value = Math.floor(diffMinutes / (60 * 24 * 30));
      return `${value}개월 전`;
    default:
      value = Math.floor(diffMinutes / (60 * 24 * 30 * 12));
      return `${value}년 전`;
  }
}
