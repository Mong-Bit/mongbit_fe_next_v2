declare namespace Containers {
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
  type MainDataProp = Model.DataFromServer;

  // viewLatestMbtiTest
  type ViewMbtiTestProp = Model.DataFromServer;
}
