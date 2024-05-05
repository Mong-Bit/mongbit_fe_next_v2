declare namespace Route {
  type MbtiTestPreviewProp = {
    params: ParsedUrlQuery;
  };
}

declare namespace Model {
  type MbtiTest = {
    id?: string;
    title?: string;
    imageUrl?: string;
    playCount?: number;
    type?: string;
    likeCount?: number;
    commentCount?: number;
  };

  type MyPageMbtiResult = {
    testId: string;
    testResultId: string;
    title: string;
    content: string;
    imageUrl: string;
    testDate: string;
  };

  type MbtiResult = {
    id: string;
    result: string;
    title: string;
    content: string;
    imageUrl: string;
  };

  type DataFromServer = {
    data:
      | {
          dataList: {
            hasNextPage: boolean;
            testCoverDTOList: Model.MbtiTest[];
          };
          headers: Headers;
        }
      | undefined;
  };

  type PreviewMbtiTest = {
    mbtiTestData: {
      test: {
        id: string;
        title: string;
        content: string;
        questions: {
          id: string;
          index: number;
          question: string;
          answerPlus: string;
          answerMinus: string;
        }[];
        results: MbtiResult[];
        createDate: string;
        imageUrl: string;
        type: string;
        playCount: number;
      };
      likeCount: number;
      shareCount;
      commentCount: number;
    };
  };

  type LogInState = {
    goPage?: {
      url?: boolean | string;
    };
    key?: string;
    mbLastCommentTime: string;
    [key: string]: string | undefined;
  };

  type CommentData = {
    id: string;
    memberId: string;
    testId: string;
    commentDate: string;
    content: string;
    username: string;
    thumbnailImage: string;
  };
}

declare namespace SetState {
  type Boolean = React.Dispatch<React.SetStateAction<boolean>>;
  type String = React.Dispatch<React.SetStateAction<string>>;
  type Number = React.Dispatch<React.SetStateAction<number>>;
  type Any = React.Dispatch<React.SetStateAction<any>>;
}
