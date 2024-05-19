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
}
