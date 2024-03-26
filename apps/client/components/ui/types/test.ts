export type TestProp = {
  testData: {
    id?: string;
    title?: string;
    imageUrl?: string;
    playCount?: number;
    type?: string;
    likeCount?: number;
    commentCount?: number;
  }[];
};

export type TestVersionBigProp = {
  imageUrl?: string;
  squareText?: string;
};

export type TestVersionSmallForSeveralProp = {
  testData: {
    commentCount?: number;
    id?: string;
    imageUrl?: string;
    likeCount?: number;
    playCount?: number;
    title?: string;
    type?: string;
  }[];
};

export type MyPageTestResultProp = {
  data: {
    // ksh --- 마이페이지 수정 시 업데이트
  }[];
  altString?: string;
};
