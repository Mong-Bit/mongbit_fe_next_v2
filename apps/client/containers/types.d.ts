declare namespace Containers {
  // logIn
  type Url = {
    url: string;
  };

  type UpdateLogInStateProp = {
    dataList: {
      memberId: string;
      thumbnail: string;
      registDate: string;
      username: string;
    };
    headers: Headers;
  };

  // main
  type MainDataProp = {
    data: {
      dataList: {
        hasNextPage: boolean;
        testCoverDTOList: {
          commentCount: number;
          id: string;
          imageUrl: string;
          likeCount: number;
          playCount: number;
          title: string;
          type: string;
        }[];
      };
      headers: Headers;
    };
  };

  // viewLatestMbtiTest
  type ViewMbtiTestProp = {
    data: {
      dataList: {
        hasNextPage: boolean;
        testCoverDTOList: testCoverDTOList[];
      };
      headers: Headers;
    };
  };

  // previewMbtiTest
  type PreviewMbtiTestProp = {
    data: {
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
  };
}
