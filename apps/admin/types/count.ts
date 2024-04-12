export type Counts = {
  name: string;
  count: number;
  totalCount: number;
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
  date: string;
  visitsCount: number;
  playsCount: number;
  loginsCount: number;
  kakaoSharesCount: number;
  linkSharesCount: number;
  likesCount: number;
  commentsCount: number;
};

export type TopContents = {
  testId: string;
  title: string;
  value: number;
};
