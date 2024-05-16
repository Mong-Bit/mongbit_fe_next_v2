export interface Comment {
  id: string;
  memberId: string;
  testId: string;
  commentDate: string;
  content: string;
}

export interface CommentData extends Comment {
  username: string;
  thumbnailImage: string;
}

// respons data
export interface CommentList {
  commentDTOList: CommentData[];
  hasNextPage: boolean;
}
