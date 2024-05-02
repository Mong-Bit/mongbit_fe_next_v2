declare namespace Util {
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
      mbtiTestDataList?: {
        hasNextPage: boolean;
        testCoverDTOList: Model.MbtiTest[];
      };
      setMbtiTestData: any;
    };
    page: {
      page: number;
      setPage: React.Dispatch<React.SetStateAction<number>>;
    };
  };

  type TestId = string | null;
  type MemberId = string | undefined;
  type LikeState = boolean;
}
