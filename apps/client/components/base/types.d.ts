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
    mbtiTestData:
      | {
          testCoverDTOList: Model.MbtiTest[];
        }
      | undefined;
    style: {
      titleText: string;
    };
  };

  type MbtiTestButtonAreaProp = {
    data: {
      likeImageUrl: string;
      likeState: boolean;
      likeCount: number;
      testId: string;
      memberId: string;
      setLikeState: React.Dispatch<React.SetStateAction<boolean>>;
    };
  };

  type MbtiTestCommentAreaProp = {
    commentCount: number;
    mbtiTestCommentData: Model.PreviewMbtiTest.mbtiTestCommentData;
  };

  type MbtiTestCommentData = Model.PreviewMbtiTest.mbtiTestCommentData;
}
