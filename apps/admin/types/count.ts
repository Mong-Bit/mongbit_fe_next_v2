export type Counts = {
  name: 'Visits' | 'Plays' | 'Logins' | 'Shares' | 'Links' | 'Likes' | 'Comments';
  count: number;
  totalCount?: number;
};

export type TotalCounts = {
  totalVisitsCount: number;
  totalPlaysCount: number;
  totalLoginsCount: number;
  totalSharesByKakao: number;
  totalSharesByLink: number;
  totalLikesCount: number;
  totalCommentsCount: number;
};

export type DateRangeCounts = {
  date?: Date;
  visitsCount: number;
  playsCount: number;
  loginsCount: number;
  kakaoSharesCount: number;
  linkSharesCount: number;
  likesCount: number;
  commentsCount: number;
};

export type MbtiTestCounts = {
  playCount: number;
  likeCount: number;
  commentCount: number;
  sharesCount: number;
  linkCount: number;
};

export type TopContents = {
  testId: string;
  title: string;
  value: number;
};
