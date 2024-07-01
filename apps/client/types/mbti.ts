export interface MbtiTest {
  id: string;
  title: string;
  content: string;
  questions: MbtiQuestions[];
  results: MbtiResults[];
  imageUrl: string;
  createDate: string;
  type: string;
  playCount: number;
}

export interface MbtiTestList {
  id: string;
  title: string;
  imageUrl: string;
  playCount: number;
  likeCount: number;
  commentCount: number;
  type: string;
}

export interface MbtiQuestions {
  id: string;
  index: number;
  question: string;
  answerPlus: string;
  answerMinus: string;
}

export interface MbtiResults {
  id: string;
  result: string;
  title: string;
  content: string;
  imageUrl: string;
}

export interface MbtiResult {
  testId: string;
  testResultId: string;
  title: string;
  content: string;
  imageUrl: string;
  testDate: string;
}

// respons data
export interface MbtiTestData {
  test: MbtiTest;
  likeCount: number;
  commentCount: number;
  sharesCount: number;
  linkCount: number;
}

export interface MbtiTestListData {
  testCoverDTOList: MbtiTestList[];
  hasNextPage: boolean;
}
