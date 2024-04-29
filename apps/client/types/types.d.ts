declare namespace Route {
  type MbtiTestPreviewProp = {
    params: ParsedUrlQuery;
  };
}

declare namespace Model {
  type MbtiTest = {
    commentCount?: number;
    id?: string;
    imageUrl?: string;
    likeCount?: number;
    playCount?: number;
    title?: string;
    type?: string;
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

        results: {
          id: string;
          result: string;
          title: string;
          content: string;
          imageUrl: string;
        }[];
        createDate: string;
        imageUrl: string;
        type: string;
      };
      playCount: number;
      likeCount: number;
      shareCount;
      commentCount: number;
    };
    mbtiTestCommentData: {
      id: string;
      memberId: string;
      testId: string;
      commentDate: string;
      content: string;
      username: string;
      thumbnailImage: string;
    }[];
  };
}