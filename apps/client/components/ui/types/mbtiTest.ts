// ksh -- 없으면 삭제
export type MbtiTestProp = {
  mbtiTestData: {
    id?: string;
    title?: string;
    imageUrl?: string;
    playCount?: number;
    type?: string;
    likeCount?: number;
    commentCount?: number;
  }[];
};

export type MbtiTestVersionBigProp = {
  imageUrl?: string;
  squareText?: string;
  countData?: {
    playCount?: number;
    likeCount?: number;
    commentCount?: number;
  };
};

export type MbtiTestVersionSmallForSeveralProp = {
  mbtiTestData: {
    commentCount?: number;
    id?: string;
    imageUrl?: string;
    likeCount?: number;
    playCount?: number;
    title?: string;
    type?: string;
  }[];
};

// export type MyPageMbtiTestResultProp = {
//   data: {
//     // ksh --- 마이페이지 수정 시 업데이트
//   }[];
//   altString?: string;
// };
