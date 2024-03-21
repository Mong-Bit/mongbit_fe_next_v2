export type MbtiTest = {
  id?: string;
  title: string;
  content: string;
  questions: MbtiQuestions[];
  results: MbtiResults[];
  imageUrl: string;
  createDate?: string;
  playCount?: number;
  type?: string;
};

export type MbtiQuestions = {
  id?: string;
  index: number;
  question: string;
  answerPlus: string;
  answerMinus: string;
};

export type MbtiResults = {
  id?: string;
  result: string;
  title: string;
  content: string;
  imageUrl?: string;
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

export type ContentList = {
  id: string;
  title: string;
  imageUrl: string;
  createDate?: string;
  playCount: number;
  likeCount: number;
  sharesCount: number;
  linkCount: number;
  commentsCount: number;
  type?: ['MBTI', 'PCL_R'];
};
