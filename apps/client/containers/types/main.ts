export type dataProp = {
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
