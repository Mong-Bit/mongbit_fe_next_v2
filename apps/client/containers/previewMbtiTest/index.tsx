'use client';
import { MEDIAQUERY } from '@/constants/constant';
import { MbtiTestPlayCountImage } from '@/public/images/mbtiTest';

import { ContentText, ContentTextWrap, MbtiTEstCountIconImageWrap, MbtiTestStartButton } from '../styledComponents';
import { MbtiTestCountIconImage } from '@/components/ui/Button';
import { Stroke } from '@/components/ui/CommonElements';
import { MbtiTestVersionBig } from '@/components/ui/MbtiTest';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

export default function PreviewMbtiTest({ data }) {
  const contentTextArray = data.content.split('<br>');
  console.log('contentTextArray::: ', contentTextArray);
  return (
    <Wrap_mediaquery flexDirection="column" alignItems="center">
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
      <MbtiTestStartButton>테스트 시작 &gt;</MbtiTestStartButton>
    </Wrap_mediaquery>
  );
}
