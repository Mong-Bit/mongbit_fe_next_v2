'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { LOGIN } from '@/constants/constant';
import { MbtiTestPlayCountImage } from '@/public/images/mbtiTest';
import { MbtiTestLikeImage, MbtiTestLikedImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { setLikeButtonColor } from '@/utils/mbtiTest';

import MbtiTestButtonArea from '@/components/base/MbtiTestButtonArea';
import MbtiTestCommentArea from '@/components/base/MbtiTestCommentArea';
import { MbtiTestCountIconImage } from '@/components/ui/Button';
import { MbtiTestVersionBig } from '@/components/ui/MbtiTest';
import { Wrap_mediaquery } from '@/components/ui/Wrap';
import {
  ContentText,
  ContentTextWrap,
  MbtiTEstCountIconImageWrap,
  MbtiTestStartButton,
  PreviewMbtiTestStroke,
} from '@/containers/styledComponents';

export default function PreviewMbtiTest({ mbtiTestData, mbtiTestCommentData }: Containers.PreviewMbtiTestProp) {
  const userInfo = useRecoilValue(atomlogInState);
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    setLikeButtonColor(mbtiTestData.test.id, userInfo[LOGIN.USER_MEMBER_ID], setLikeState);
  }, []);

  const likeImageUrl = likeState ? MbtiTestLikedImage.src : MbtiTestLikeImage.src;
  const buttonAreaProp = {
    setLikeState,
    testId: mbtiTestData.test.id,
    memberId: userInfo[LOGIN.USER_MEMBER_ID],
    likeState: likeState,
    likeImageUrl: likeImageUrl,
    likeCount: mbtiTestData.likeCount,
  };

  const contentTextArray = mbtiTestData.test.content.split('<br>');

  return (
    <Wrap_mediaquery flexDirection="column" alignItems="center">
      {/* Mbti 테스트 정보 */}
      <MbtiTestVersionBig imageUrl={mbtiTestData.test.imageUrl} squareText={mbtiTestData.test.title} />
      <MbtiTEstCountIconImageWrap>
        <MbtiTestCountIconImage imageUrl={MbtiTestPlayCountImage.src} />
        <ContentText padding="0 0 0 0.2rem">{mbtiTestData.playCount}</ContentText>
      </MbtiTEstCountIconImageWrap>

      <PreviewMbtiTestStroke margin="1rem 0 1.5rem 0" />

      <ContentTextWrap>
        {contentTextArray.map((e: string, id: number) => (
          <ContentText padding="0.2rem 0 0 0" key={`${e}${id}`}>
            {e}
          </ContentText>
        ))}
      </ContentTextWrap>

      {/* Mbti 테스트 시작 버튼 */}
      <MbtiTestStartButton>테스트 시작 &gt;</MbtiTestStartButton>
      <MbtiTestButtonArea data={buttonAreaProp} />

      <PreviewMbtiTestStroke margin="1.5rem 0 3rem 0" />

      {/* Mbti 테스트 댓글 영역 */}
      <MbtiTestCommentArea commentCount={mbtiTestData.commentCount} mbtiTestCommentData={mbtiTestCommentData} />
    </Wrap_mediaquery>
  );
}
