declare namespace Base {
  type MbtiTestCountImageAreaProp = {
    countData?: {
      playCount?: number;
      likeCount?: number;
      commentCount?: number;
    };
  };

  type TitleAndTextProps = {
    text: {
      titleText?: string;
      contentText?: string;
    };
  };

  type TitleAndMbtiTestProps = {
    detail: {
      titleText?: string;
      imageUrl?: string;
      squareText?: string;
    };
  };

  type TitleAndMbtiTestsSmallForSeveralProp = {
    mbtiTestData: {
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
}
