declare namespace Hooks {
  type containerRefCurrent = {
    current: HTMLDivElement | null;
  };

  type setData = React.Dispatch<
    React.SetStateAction<{ mbtiTestData: { likeCount: null; commentCount: null }; mbtiTestCommentData: null }>
  >;
}
