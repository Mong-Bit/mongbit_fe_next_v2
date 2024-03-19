export type memberTestResultData = {
  memberTestResultDTOList: [MemberTestResultDTOList];
  hasNextPage: number;
}

export type MemberTestResultDTOList = {
  testId: string;
  testResultId: string;
  testDate: string;
  title: string;
  content: string;
  imageUrl: string;
}
export type TestResultFromMyPage = {
  testId: string;
  result: string;
  title: string;
  content: string;
  imageUrl: string;
  likeCount: number;
}
