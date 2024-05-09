export interface Comment {
  id: string;
  memberId: string;
  testId: string;
  commentDate: string;
  content: string;
}

// respons data
export interface CommentData extends Comment {
  commentDTOList: Comment[];
  hasNextPage: boolean;
}
