import { LOGIN } from '@/constants/constant';

export function getHeaders(isContentTypeJson = false) {
  if (typeof sessionStorage === 'undefined') return;
  const sessionStorageDataString = sessionStorage.getItem(LOGIN.MONGBIT);

  const json = sessionStorageDataString ? JSON.parse(sessionStorageDataString) : null;
  const token = json ? json.recoil_logIn[LOGIN.TOKEN_NAME] : '';
  return {
    Authorization: token,
    'Content-Type': isContentTypeJson ? 'application/json' : null,
  };
}

export function goPageWithSelector(selector: Model.LogInState, router: any) {
  const url = selector.goPage?.url;

  if (typeof url !== 'string') return;
  if (url.includes('need_login')) router.back();
  return router.push(url);
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

export function checkCommentAddValidity(currentTime: Date, previousTime: Date | null) {
  // 마지막 코멘트를 등록한 시점부터 20초가 지났는지의 여부 반환

  if (!previousTime) return true; // 최초 로그인 했을 때

  const timeDiffInMillis = currentTime.getTime() - previousTime?.getTime();
  return timeDiffInMillis >= 20000;
}

export function doSetActionWithNewValue(
  prevState: any,
  setState: React.Dispatch<React.SetStateAction<any>>,
  index: number | null,
  newValue: any,
) {
  const newState = index === null ? newValue : [...prevState];

  if (index !== null) newState[index] = newValue;
  setState(newState);
}
