export type Test = {
  id: string;
  title: string;
  content: string;
  questions: [Question];
  results: [TestResultData];
  imageUrl: string;
  playCount: number;
  type: ['MBTI', 'PCL_R'];
};

export type TestResultData = {
  id: string;
  result: string;
  title: string;
  content: string;
  imageUrl: string;
};

export type Question = {
  id: string;
  index: number;
  question: string;
  answerPlus: string;
  answerMinus: string;
};

export type TestCover = {
  id: string;
  title: string;
  imageUrl: string;
  playCount: number;
  type: ['MBTI', 'PCL_R'];
  likeCount: number;
  commentCount: number;
};

export type TestCoverResponse = {
  testCoverDTOList: TestCover[];
  hasNextPage: boolean;
};
