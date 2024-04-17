'use client';
import { MEDIAQUERY } from '@/constants/constant';
import { MbtiTestPlayCountImage } from '@/public/images/mbtiTest';
import {
  MbtiTestLinkCopyImage,
  MbtiTestLinkCopiedImage,
  MbtiTestLikeImage,
  MbtiTestLikedImage,
} from '@/public/images/mbtiTest';

import MbtiTestButtonArea from '@/components/base/MbtiTestButtonArea';
import { MbtiTestCountIconImage } from '@/components/ui/Button';
import { Stroke } from '@/components/ui/CommonElements';
import { MbtiTestVersionBig } from '@/components/ui/MbtiTest';
import { Wrap_mediaquery } from '@/components/ui/Wrap';
import {
  ContentText,
  ContentTextWrap,
  MbtiTEstCountIconImageWrap,
  MbtiTestStartButton,
} from '@/containers/styledComponents';

export default function PreviewMbtiTest({ data }) {
  console.log('data::: ', data);
  const contentTextArray = data.content.split('<br>');

  return (
    <Wrap_mediaquery flexDirection="column" alignItems="center">
      {/* Mbti 테스트 정보 */}
      <MbtiTestVersionBig imageUrl={data.imageUrl} squareText={data.title} />
      <MbtiTEstCountIconImageWrap>
        <MbtiTestCountIconImage imageUrl={MbtiTestPlayCountImage.src} />
        <ContentText padding="0 0 0 0.2rem">{data.playCount}</ContentText>
      </MbtiTEstCountIconImageWrap>

      <Stroke width={MEDIAQUERY.WIDTH_370} margin="1rem 0" />

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
        likeCount={data.likeCount}
      />
    </Wrap_mediaquery>
  );
}
