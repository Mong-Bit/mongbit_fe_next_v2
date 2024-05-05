import lottie from 'lottie-web';
import { useEffect } from 'react';

import { getMbtiTestCommentData, getMbtiTestData } from '@/services';

export function useAnimationEffect(containerRef: Hooks.containerRefCurrent, animationData: any) {
  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      animationData,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });

    return () => {
      anim?.destroy();
    };
  }, [containerRef]);
}

export function useLoadMbtiTestDatas(
  testId: string | null,
  setData: Hooks.SetData,
  { commentPage, setCommentPage }: Hooks.CommentPage,
) {
  useEffect(() => {
    if (!testId) return;

    getMbtiTestData(testId).then(
      // mbti test 데이터 조회가 성공하면
      (responseTest) => {
        getMbtiTestCommentData(testId, commentPage).then(
          // mbti 코멘트 데이터 조회
          (responseComment) =>
            setData((prev) => ({
              ...prev,
              mbtiTestData: responseTest?.dataList,
              mbtiTestCommentData: responseComment?.dataList.commentDTOList,
              hasNextPageComment: responseComment?.dataList.hasNextPage,
            })),
        );
        setCommentPage(commentPage + 1);
      },
    );
  }, []);
}
