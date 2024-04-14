declare namespace Util {
  type LogInState = {
    goPage?: {
      url?: boolean | string;
    };
    key?: string;
    mbRegisterDate?: string;
    mbThumbnail?: string;
    mbToken?: string;
    mbUserID?: string;
    mbUserName?: string;
  };

  type DecodedToken = {
    state?: boolean;
    role?: string;
  } | void;

  type JwtPayload = {
    auth?: string;
    exp?: number;
  };

  type doSeeMoreMbtiTestsProp = {
    fetchOption: Services.FetchClientProp;
    data: {
      mbtiTestDataList: {
        hasNextPage: boolean;
        testCoverDTOList: Base.MbtiTest[];
      };
      setMbtiTestData: React.Dispatch<
        React.SetStateAction<{
          dataList: { hasNextPage: boolean; testCoverDTOList: testCoverDTOList[] };
          headers: Headers;
        }>
      >;
    };
    page: {
      page: number;
      setPage: React.Dispatch<React.SetStateAction<number>>;
    };
  };
}
