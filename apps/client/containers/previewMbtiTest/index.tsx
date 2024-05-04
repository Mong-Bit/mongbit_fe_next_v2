'use client';

import { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { LOGIN } from '@/constants/constant';
import { useLoadMbtiTestDatas } from '@/hooks/hooks';
import { useAnimationEffect } from '@/hooks/hooks';
import loadingAnimationData from '@/public/animation/loading.json';
import { MbtiTestPlayCountImage } from '@/public/images/mbtiTest';
import { MbtiTestLikeImage, MbtiTestLikedImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { getLikeState } from '@/services';

import MbtiTestButtonArea from '@/components/base/MbtiTestButtonArea';
import MbtiTestCommentArea from '@/components/base/MbtiTestCommentArea';
import { MbtiTestCountIconImage } from '@/components/ui/Button';
import { MbtiTestVersionBig } from '@/components/ui/MbtiTest';
import { AnimationDiv } from '@/components/ui/styledComponents';
import { Wrap_mediaquery } from '@/components/ui/Wrap';
import {
  ContentText,
  ContentTextWrap,
  MbtiTEstCountIconImageWrap,
  MbtiTestStartButton,
  PreviewMbtiTestStroke,
} from '@/containers/styledComponents';

export default function PreviewMbtiTest({ mbtiTestData }: Model.PreviewMbtiTest) {
  const userInfo = useRecoilValue(atomlogInState);
  const containerRef = useRef(null);
  const [likeState, setLikeState] = useState(false);
  const [data, setData] = useState({
    mbtiTestData: { likeCount: null, commentCount: null },
    mbtiTestCommentData: null,
  });

  const testId = mbtiTestData ? mbtiTestData.test.id : null;

  // hooks
  useAnimationEffect(containerRef, loadingAnimationData);

  useEffect(() => {
    getLikeState(testId, userInfo[LOGIN.USER_MEMBER_ID]).then((response) => setLikeState(response?.dataList));
  }, []);

  useLoadMbtiTestDatas(testId, setData);

  const likeImageUrl = likeState ? MbtiTestLikedImage.src : MbtiTestLikeImage.src;
  const buttonAreaProp = {
    setLikeState,
    testId: testId,
    memberId: userInfo[LOGIN.USER_MEMBER_ID],
    likeState: likeState,
    likeImageUrl: likeImageUrl,
    likeCount: data.mbtiTestData?.likeCount,
  };

  const contentTextArray = mbtiTestData?.test.content.split('<br>');

  if (data.mbtiTestData.likeCount) {
    return (
      <Wrap_mediaquery flexDirection="column" alignItems="center">
        {/* Mbti 테스트 정보 */}
        <MbtiTestVersionBig imageUrl={mbtiTestData.test.imageUrl} squareText={mbtiTestData.test.title} />
        <MbtiTEstCountIconImageWrap>
          <MbtiTestCountIconImage imageUrl={MbtiTestPlayCountImage.src} />
          <ContentText padding="0 0 0 0.2rem">{mbtiTestData.test.playCount}</ContentText>
        </MbtiTEstCountIconImageWrap>

        <PreviewMbtiTestStroke margin="1rem 0 1.5rem 0" />

        <ContentTextWrap>
          {contentTextArray.map((el: string, id: number) => (
            <ContentText padding="0.2rem 0 0 0" key={`${el}${id}`}>
              {el}
            </ContentText>
          ))}
        </ContentTextWrap>

        {/* Mbti 테스트 시작 버튼 */}
        <MbtiTestStartButton>테스트 시작 &gt;</MbtiTestStartButton>
        <MbtiTestButtonArea data={buttonAreaProp} />

        <PreviewMbtiTestStroke margin="1.5rem 0 3rem 0" />

        {/* Mbti 테스트 댓글 영역 */}
        <MbtiTestCommentArea
          commentCount={data.mbtiTestData?.commentCount}
          mbtiTestCommentData={data.mbtiTestCommentData ?? []}
        />
      </Wrap_mediaquery>
    );
  } else {
    return (
      <Wrap_mediaquery justifyContent="center" position="relative">
        <AnimationDiv ref={containerRef} />
      </Wrap_mediaquery>
    );
  }
}
