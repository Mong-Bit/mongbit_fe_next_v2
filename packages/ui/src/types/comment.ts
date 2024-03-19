
  export type CommentDTO = {
    id: string;
    memberId: string;
    testId: string;
    commentDate: string;
    content: string;
    username: string;
    thumbnailImage: string;
  }

  export type CommentData = {
    id: string;
    memberId: string;
    testId: string;
    commentDate: string;
    content: string;
  }

  export type CommentResponse = {
    commentDTOList: [CommentDTO];
    hasNextPage: boolean;
  }
