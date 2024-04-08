export type dataProp = {
  data: {
    dataList: {
      hasNextPage: boolean;
      testCoverDTOList: {
        id: string;
        commentCount: number;
        likeCount: number;
        playCount: number;
        title: string;
        imageUrl: string;
        type: string;
      }[];
    };
    headers: Headers;
  };
};
