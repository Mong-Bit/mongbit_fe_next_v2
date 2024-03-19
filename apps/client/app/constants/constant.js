// Domain
export const DOMAIN = 'https://mongbit.vercel.app';
// export const DOMAIN_BE_DEV = 'https://mongbit-willneiman.koyeb.app';
export const DOMAIN_BE_PROD = 'https://mongbit.site';

// Storage, Recoil
export const COUPANG_VISIT = 'mbCoupangVisitDate';
export const LOGIN = {
  MONGBIT: 'mongbit',
  TOKEN_NAME: 'mbToken',
  USER_MEMBER_ID: 'mbUserID',
  USER_THUMBNAIL: 'mbThumbnail',
  USER_REGISTER_DATE: 'mbRegisterDate',
  USER_USER_NAME: 'mbUserName',
  COUPANG_VISIT: 'mbCoupangVisitDate',
  ROLE_ADMIN: 'ROLE_ADMIN',
};

// Type of the page
export const TYPE_TEST_LIST = 'test_list';
export const TYPE_TEST_PREVIEW = 'test_preview';
export const TYPE_LATEST_MAIN = 'main_latest';
export const TITLE_WITH_CONTENT = 'with_content';
export const TYPE_ON_TEST = 'on_test';
export const TYPE_LOGIN = 'login';
export const TYPE_MYPAGE = 'mypage';

//Type of the button
export const TYPE_COMMENT = 'comment';
export const TYPE_COMMENT_CNT = 'commentCnt';
export const TYPE_PLAY_CNT = 'playCnt';
export const TYPE_LIKE_CNT = 'likeCnt';

//Text Length
export const NUMBER_500 = 500;

//Alert msg
export const ALL_FULLFILL = '모든 항목을 입력해주세요.';
export const LENGTH_OVER_500 = '500자 이상으로 작성한 항목이 존재합니다.';
export const COMMENT_TIME = '코멘트 등록은 20초 간격으로 가능합니다.';

//OG Image url
export const OG_STANDARD_IMAGE = 'https://i.ibb.co/mvVsyTr/Frame-17.png';
export const OG_RANDOM_IMAGE = 'https://i.ibb.co/N9ntw7s/og-random.png';
export const OG_TEST_RESULT = 'https://i.ibb.co/tQWt0dF/image.png';
export const OG_TEST_GO = 'https://i.ibb.co/P4KyxjF/image.png'; // 이건 아직 사용하는 곳 없음

// 화면, 폰트
export const MEDIAQUERY = {
  WIDTH_340: '340px',
  WIDTH_345: '345px',
  WIDTH_375: '375px',
  WIDTH_370: '370px',
  WIDTH_400: '400px',
  WIDTH_420: '420px',
};

export const CONST_FONT = {
  COLOR: {
    GRAY_1: '#8f8f8f',
    GRAY_2: '#979797',
    GRAY_3: '#f2f2f2',
    WHITE: 'white',
    BLACK: 'black',
  },
  SIZE: {
    FONT_SIZE_BIG: '1.2rem',
    FONT_SIZE_REGULAR: '0.9rem',
    FONT_SIZE_SMALL_1: '0.8rem',
    FONT_SIZE_SMALL_2: '0.7rem',
  },
  BOLD_SCALE: {
    FIRST: '500',
    SECOND: '700',
  },
};

// UI 컴포넌트 별
export const TEST_ICON = {
  URL: {
    PLAY_COUNT: '/packages/ui/public/images/testButton/playCnt.svg',
  },
  SIZE: {
    WIDTH: '15px',
    HEIGHT: '15px',
  },
};

export const BUTTON_TYPE = {
  HEADER_MYPAGE: 'myPageButton',
  HEADER_MAINLOGO: 'mainLogoButton',
  HEADER_SIDEMENU: 'sideMenuButton',
};

export const YELLOW_BUTTON = {
  BACKGROUND_COLOR: '#ffc52f',
  TRANSITION: 'background-color 0.3s ease-in-out',
  FONT_COLOR: 'white',
};

export const TEST_IMAGE_URL = {
  MAIN_TEST: 'https://i.ibb.co/GJ08BC3/quick-mbti-cover.png',
};

export const IMAGE_ALT_STRING = {
  MONGBIT_TITLE: '몽빗 MBTI 심리테스트 ',
};

// 페이지 별
export const CONST_MAIN_PAGE = {
  MAIN_TITLE_TEXT: {
    TITLE: '👀 랜덤 심리테스트',
    CONTENT: '고민할 틈은 안줄테니 일단 플레이하고 생각하기',
  },
  RANDOM_START_BUTTON_TEXT: '아무거나 시작 >',
  TITLE_TEXT: {
    MAIN_TEST: '🌟 심테의 근본, MBTI 검사',
    MAIN_TEST_SQUARE: '신속하고 아마도 정확한 퀵 MBTI!',
    LATEST_TEST: '💙 최신 심테',
  },
};

export const CONST_HEADER = {
  HEADER_BUTTON_IMAGE_URL: {
    SIDE_MENU_ICON: '/packages/ui/src/images/header/sideMenu.svg',
    MAIN_LOGO_ICON: '/packages/ui/src/images/header/logoMain.svg',
    USER_ICON: '/packages/ui/src/images/header/user.svg',
  },
  SIDE_MENU_WHITE_BOARD_WIDTH: 220,
};

export const CONST_FOOTER = {
  DESCRIPTION: [
    '몽뭉이 크루 \u00a0\u00a0 | \u00a0\u00a0  서울 관악구 신림역 스터디존에서 만듦',
    ' 채용문의 \u00a0\u00a0 | \u00a0\u00a0 채용되고 싶다',
  ],
  POLICY: ['이용약관', '개인정보처리방침'],
  PAGE_URL: ['/terms', '/policy'],
  COPYRIGHT: '© 2023 MongMoongCrew. All rights reserved',
  BUTTON_IMG_URL: ['/packages/ui/public/images/footer/gitHub.svg', '/packages/ui/public/images/footer/instagram.png'],
  LINK_URL: ['https://github.com/Moorisong/MongBit_FE_Next', 'https://www.instagram.com/mongbit_'],
};
