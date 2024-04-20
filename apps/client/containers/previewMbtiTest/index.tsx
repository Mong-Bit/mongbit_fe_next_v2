'use client';

import { MbtiTestPlayCountImage } from '@/public/images/mbtiTest';
import {
  MbtiTestLinkCopyImage,
  MbtiTestLinkCopiedImage,
  MbtiTestLikeImage,
  MbtiTestLikedImage,
} from '@/public/images/mbtiTest';

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
  mbtiTestData.likeCount = 33;
  mbtiTestData.commentCount = 10;

  const contentTextArray = mbtiTestData.content.split('<br>');

  return (
    <Wrap_mediaquery flexDirection="column" alignItems="center">
      {/* Mbti 테스트 정보 */}
      <MbtiTestVersionBig imageUrl={mbtiTestData.imageUrl} squareText={mbtiTestData.title} />
      <MbtiTEstCountIconImageWrap>
        <MbtiTestCountIconImage imageUrl={MbtiTestPlayCountImage.src} />
        <ContentText padding="0 0 0 0.2rem">{mbtiTestData.playCount}</ContentText>
      </MbtiTEstCountIconImageWrap>

      <PreviewMbtiTestStroke margin="1rem 0 1.5rem 0" />

      <ContentTextWrap>
        {contentTextArray.map((e: string, id: number) => (
          <ContentText padding="0.2rem 0 0 0" key={e + id}>
            {e}
          </ContentText>
        ))}
      </ContentTextWrap>

      {/* Mbti 테스트 시작 버튼 */}
      <MbtiTestStartButton>테스트 시작 &gt;</MbtiTestStartButton>
      <MbtiTestButtonArea
        linkCopyImageUrl={MbtiTestLinkCopyImage.src}
        likeImageUrl={MbtiTestLikeImage.src}
        likeCount={mbtiTestData.likeCount}
      />

      <PreviewMbtiTestStroke margin="1.5rem 0 3rem 0" />

      {/* Mbti 테스트 댓글 영역 */}
      <MbtiTestCommentArea commentCount={mbtiTestData.commentCount} mbtiTestCommentData={mbtiTestCommentData} />
    </Wrap_mediaquery>
  );
}
