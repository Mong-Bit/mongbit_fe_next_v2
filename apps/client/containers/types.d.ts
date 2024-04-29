declare namespace Containers {
  // logIn
  type Url = {
    url: string;
  };

  type UpdateLogInStateProp =
    | {
        dataList: {
          memberId: string;
          thumbnail: string;
          registDate: string;
          username: string;
        };
        headers: Headers;
      }
    | undefined;

  // main
  type MainDataProp = {
    data:
      | {
          dataList: {
            hasNextPage: boolean;
            testCoverDTOList: Base.MbtiTest[];
          };
          headers: Headers;
        }
      | undefined;
  };

  // viewLatestMbtiTest
  type ViewMbtiTestProp = {
    data:
      | {
          dataList: {
            hasNextPage: boolean;
            testCoverDTOList: Base.MbtiTest[];
          };
          headers: Headers;
        }
      | undefined;
  };

  // previewMbtiTest
  type PreviewMbtiTestProp = {
    mbtiTestData: {
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
      playCount: number;
      likeCount: number;
      commentCount: number;
      type: string;
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
