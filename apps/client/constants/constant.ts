import { GitHubImage, InstagramImage } from '@/public/images/footer';

// Domain
export const DOMAIN_BE_PROD = process.env.NEXT_PUBLIC_BE_URL_PROD as string;
export const DOMAIN_FE_PROD = process.env.NEXT_PUBLIC_FE_URL_PROD as string;

// Storage, Recoil
export const COUPANG_VISIT = 'mbCoupangVisitDate';
export const LOGIN = {
  MONGBIT: 'mongbit',
  TOKEN_NAME: 'mbToken',
  USER_MEMBER_ID: 'mbUserID',
  USER_THUMBNAIL: 'mbThumbnail',
  USER_REGISTER_DATE: 'mbRegisterDate',
  USER_NAME: 'mbUserName',
  COUPANG_VISIT: 'mbCoupangVisitDate',
  ROLE_ADMIN: 'ROLE_ADMIN',
  LAST_COMMENT_TIME: 'mbLastCommentTime',
};

export const ANSWER_TYPE = {
  PLUS: 'plus',
  MINUS: 'minus',
};

//Alert msg
export const MESSAGE = {
  COMMENT_TIME: '코멘트 등록은 20초 간격으로 가능합니다.',
};

//OG Image url
export const OG_STANDARD_IMAGE = 'https://i.ibb.co/mvVsyTr/Frame-17.png';
export const OG_RANDOM_IMAGE = 'https://i.ibb.co/N9ntw7s/og-random.png';
export const OG_MBTI_TEST_RESULT = 'https://i.ibb.co/tQWt0dF/image.png';
export const OG_MBTI_TEST_GO = 'https://i.ibb.co/P4KyxjF/image.png'; // 이건 아직 사용하는 곳 없음

// UI 컴포넌트 별
export const BUTTON_TYPE = {
  HEADER_MYPAGE: 'myPageButton',
  HEADER_MAINLOGO: 'mainLogoButton',
  HEADER_SIDEMENU: 'sideMenuButton',
  YELLOW_BUTTON: {
    BACKGROUND_COLOR: '#ffc52f',
    HOVER_BACKGROUND_COLOR: '#f8b713',
    TRANSITION: 'background-color 0.3s ease-in-out',
    FONT_COLOR: 'white',
  },
};

export const IMAGE_ALT_STRING = {
  MONGBIT_TITLE: '몽빗 MBTI 심리테스트 ',
};

export const MBTI_TEST_BUTTON_TYPE = {
  LINK_COPY: 'linkCopy',
  LIKE: 'like',
  SHARE: 'share',
};

// 페이지 별

export const VIEW_MBTI_TEST_PAGE = {
  LATEST: {
    TITLE_TEXT: '😜 최신 심테',
    CONTENT_TEXT: '몽빗 최신 심테들 여기 다 모여있어요!',
  },
  TOTAL: {
    TITLE_TEXT: '💛 몽빗 심테',
    CONTENT_TEXT: '몽빗에 있는 모든 테스트는 이곳에!',
  },
};

export const CONST_HEADER = {
  SIDE_MENU_WHITE_BOARD_WIDTH: 220,
};

export const CONST_FOOTER = {
  DESCRIPTION: [
    '몽뭉이 크루 \u00a0| \u00a0  서울 관악구 신림역 스터디존에서 만듦',
    ' 채용문의 \u00a0| \u00a0 채용되고 싶다',
  ],
  POLICY: ['이용약관', '개인정보처리방침'],
  PAGE_URL: ['/terms', '/policy'],
  COPYRIGHT: '© 2023 MongMoongCrew. All rights reserved',
  BUTTON_IMG_URL: [GitHubImage.src, InstagramImage.src],
  LINK_URL: ['https://github.com/Moorisong/MongBit_FE_Next', 'https://www.instagram.com/mongbit_'],
};

// key down
export const KEY = {
  ENTER: 'Enter',
};
