export type TitleAndTextProps = {
  text: {
    titleText?: string;
    contentText?: string;
  };
};

export type TitleAndTestProps = {
  detail: {
    titleText?: string;
    imageUrl?: string;
    squareText?: string;
  };
};

export type TitleAndTestsSmallForSeveralProp = {
  testData: {
    testCoverDTOList: {
      commentCount?: number;
      id?: string;
      imageUrl?: string;
      likeCount?: number;
      playCount?: number;
      title?: string;
      type?: string;
    }[];
  };
  style: {
    titleText: string;
  };
};
