
import { DOMAIN_BE_PROD } from '@/constants/constant';


export function shareToKakaotalk_mbtiTest(mbtiTestId, memberId, type, title, mbtiTestImgUri, likeCnt) {
  if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: 'MBTI 심테는 "몽빗"에서✨',
      description: title,
      imageUrl: mbtiTestImgUri,
      link: {
        mobileWebUrl: `${DOMAIN_BE_PROD}/test/preview/${mbtiTestId}`,
        webUrl: `${DOMAIN_BE_PROD}/test/preview/${mbtiTestId}`,
      },
    },
    social: {
      likeCount: likeCnt,
    },
    buttons: [
      {
        title: '테스트 하러 가기',
        link: {
          mobileWebUrl: `${DOMAIN_BE_PROD}/test/preview/${mbtiTestId}`,
          webUrl: `${DOMAIN_BE_PROD}/test/preview/${mbtiTestId}`,
        },
      },
    ],
    serverCallbackArgs: `{"mbtiTestId": "${mbtiTestId}", "memberId": "${memberId}", "type": "${type}"}`,
  });
}

export function shareToKakaotalk_result(mbtiTestId, memberId, type, title, description, resultImgUri, pathName, likeCnt) {
  if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '나의 심테 결과는.. 🤔',
      description: title,
      imageUrl: resultImgUri,
      link: {
        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
        mobileWebUrl: `${DOMAIN_BE_PROD}${pathName}`,
        webUrl: `${DOMAIN_BE_PROD}${pathName}`,
      },
    },
    social: {
      likeCount: likeCnt,
    },
    buttons: [
      {
        title: '테스트 하기',
        link: {
          mobileWebUrl: `${DOMAIN_BE_PROD}/test/preview/${mbtiTestId}`,
          webUrl: `${DOMAIN_BE_PROD}/test/preview/${mbtiTestId}`,
        },
      },
      {
        title: '결과 보기',
        link: {
          mobileWebUrl: `${DOMAIN_BE_PROD}${pathName}`,
          webUrl: `${DOMAIN_BE_PROD}${pathName}`,
        },
      },
    ],
    serverCallbackArgs: `{"mbtiTestId": "${mbtiTestId}", "memberId": "${memberId}", "type": "${type}"}`,
  });
}

export function setUTMParameter(router) {
  const userAgent = navigator.userAgent.toLowerCase();
  let utmSource = '';

  if (userAgent.includes('facebook')) {
    utmSource = 'facebook';
  } else if (userAgent.includes('kakaotalk')) {
    utmSource = 'kakao';
  } else if (userAgent.includes('twitter')) {
    utmSource = 'twitter';
  } else if (userAgent.includes('instagram')) {
    utmSource = 'instagram';
  } else {
    utmSource = 'other';
  }

  function getUtmUrl() {
    const param = `/?utm_source=${utmSource}`;
    // 새로고침 시 UTM 파라미터가 늘어나지 않도록 조치
    if (!window.location.href.includes('utm_')) return window.location.href + param;
    return window.location.href;
  }
  router.push(getUtmUrl());
}

export function numberFormatToKoreanStyle(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function resetVisitStateInMidnihgt() {
  // 일일 방문자 수 체크를 위해 자정이 되면 로컬 스토리지의 mg_visitCounted 값을 false로 업데이트
  const now = new Date();
  const storedDate = new Date(localStorage.getItem('mg_visitCounted'));

  function needToresetState(nowDate) {
    if (!storedDate || storedDate.setHours(0, 0, 0, 0) < nowDate.setHours(0, 0, 0, 0)) return true;
    return false;
  }

  if (storedDate !== 'n' && needToresetState(now)) localStorage.setItem('mg_visitCounted', 'n');
}

export function addDailyVisitCount() {
  // 일별 방문자 수 산정을 위한 API 호출 및 로컬 스토리지 업데이트

  resetVisitStateInMidnihgt();

//   const headers = getHeaders();
//   const params = {
//     landingPage: encodeURI(window.location.href),
//   };

  if (localStorage.getItem('mg_visitCounted') === null) localStorage.setItem('mg_visitCounted', 'n');
//   if (localStorage.getItem('mg_visitCounted') === 'n') {
//     apiBe.post('/api/v1/visits/', null, { headers, params }).then(() => {
//       localStorage.setItem('mg_visitCounted', new Date());
//     });
//   }
}

// ----------- Date 포맷 관련 함수들

export function formatTodayDateTimeRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const startDate = `${year}-${month}-${day} 00:00:00`;
  const endDate = `${year}-${month}-${day} 23:59:59`;

  return {
    startDate,
    endDate,
  };
}

export function formatTimeRangeFromToday(days) {
  // days만큼 이전 날짜와 오늘 날짜를 리턴함

  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setDate(now.getDate() - days);

  const pastYear = pastDate.getFullYear();
  const pastMonth = String(pastDate.getMonth() + 1).padStart(2, '0');
  const pastDay = String(pastDate.getDate()).padStart(2, '0');

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const startDate = `${pastYear}-${pastMonth}-${pastDay} 00:00:00`;
  const endDate = `${year}-${month}-${day} 23:59:59`;

  return {
    startDate,
    endDate,
  };
}

export function formatDateToShort(dateString) {
  // yyyy-MM-dd HH:mm:ss -> mm/dd 변환

  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const shortDate = `${month}/${day}`;

  return shortDate;
}

