declare namespace Hooks {
  type containerRefCurrent = {
    current: HTMLDivElement | null;
  };

  type SetData = React.Dispatch<
    React.SetStateAction<{
      mbtiTestData: { likeCount: null; commentCount: null };
      mbtiTestCommentData: null;
      hasNextPageComment: boolean;
    }>
  >;

  type CommentPage = {
    commentPage: number;
    setCommentPage: SetState.Number;
  };
}
