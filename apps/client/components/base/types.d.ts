declare namespace Base {
  type MbtiTestCountImageAreaProp = {
    countData?: Model.MbtiTestCountData;
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
      setLikeState: SetState.Boolean;
    };
    shareDetail: {
      imageUrl: string;
      mbtiTestTitle: string;
    };
  };

  type MbtiTestCommentAreaProp = {
    testId: string | null;
    commentCount: number | null;
    commentPageSet: {
      commentPage: number;
      setCommentPage: SetState.Number;
    };
    mbtiTestCommentData: Model.CommentData[];
    hasNextPageComment: boolean;
    setAction: SetState.String;
  };

  type CommentBodyProp = {
    testId: string | null;
    commentData: Model.CommentData[];
    userInfo: Model.LogInState;
    setAction: SetState.String;
  };
}
