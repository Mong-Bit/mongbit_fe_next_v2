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
      likeCount: number | null;
      testId: string | null;
      memberId: string;
      setLikeState: React.Dispatch<React.SetStateAction<boolean>>;
    };
  };

  type MbtiTestCommentAreaProp = {
    testId: string | null;
    commentCount: number | null;
    commentPageSet: {
      commentPage: number;
      setCommentPage: React.Dispatch<React.SetStateAction<number>>;
    };
    mbtiTestCommentData: Model.CommentData[];
    hasNextPageComment: boolean;
    setAction: React.Dispatch<React.SetStateAction<string>>;
  };

  type CommentBodyProp = {
    testId: string | null;
    commentData: Model.CommentData[];
    userInfo: Model.LogInState;
    setAction: React.Dispatch<React.SetStateAction<string>>;
  };
}
