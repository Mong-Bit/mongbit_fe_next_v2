type testCoverDTOList = {
  id: string;
  commentCount: number;
  likeCount: number;
  playCount: number;
  title: string;
  imageUrl: string;
  type: string;
};
export type dataProp = {
  data: {
    dataList: {
      hasNextPage: boolean;
      testCoverDTOList: testCoverDTOList[];
    };
    headers: Headers;
  };
};

export type response = testCoverDTOList;
