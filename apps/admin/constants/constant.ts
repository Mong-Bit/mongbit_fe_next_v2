import { OptionType } from '@/types/options';

export const TOKEN_NAME = 'ADMIN_token';
export const USER = 'ADMIN_user';
export const USER_INFO = 'userInfo';

export const MEMBER_ID = 'memeberId';
export const THUMBNAIL = 'thumbnail';
export const REGIST_DATE = 'registDate';
export const USER_NAME = 'username';

export const AUTHORIZATION = 'authorization';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';

export const COUNT_OPTIONS: OptionType[] = [
  { label: 'Visits', value: 'visitsCount' },
  { label: 'Plays', value: 'playsCount' },
  { label: 'Logins', value: 'loginsCount' },
  { label: 'Shares', value: 'kakaoSharesCount' },
  { label: 'Links', value: 'linkSharesCount' },
  { label: 'Likes', value: 'likesCount' },
  { label: 'Comments', value: 'commentsCount' },
];

export const TOP_COUNT_OPTIONS: OptionType[] = [
  { label: 'Plays', value: 'tests' },
  { label: 'Shares', value: 'shares' },
  { label: 'Likes', value: 'likes' },
  { label: 'Comments', value: 'comments' },
];

export const CONTENTS_COUNT_OPTIONS: OptionType[] = [
  { label: 'Plays', value: 'playCount' },
  { label: 'Shares', value: 'sharesCount' },
  { label: 'Likes', value: 'likeCount' },
  { label: 'Links', value: 'linkCount' },
  { label: 'Comments', value: 'commentCount' },
];
export const DATE_FORMAT = 'YYYY-MM-DD';
