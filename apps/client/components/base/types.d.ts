declare namespace Base {
  interface MbtiTest {
    commentCount?: number;
    id?: string;
    imageUrl?: string;
    likeCount?: number;
    playCount?: number;
    title?: string;
    type?: string;
  }

  type MemberTestResult = {
    testId: string;
    testResultId: string;
    testDate: string;
    title: string;
    content: string;
    imageUrl: string;
  };

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
          testCoverDTOList: MbtiTest[];
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
    mbtiTestCommentData: PreviewMbtiTestProp.mbtiTestCommentData;
  };

  type MbtiTestCommentData = {
    id: string;
    memberId: string;
    testId: string;
    commentDate: string;
    content: string;
    username: string;
    thumbnailImage: string;
  };
}
