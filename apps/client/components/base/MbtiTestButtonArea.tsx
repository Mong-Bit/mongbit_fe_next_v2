import { FONT } from '@/constants/constant';
import { MbtiTestShareImage } from '@/public/images/mbtiTest';

import { ButtonTextWrap } from './styledComponents';
import { Wrap_mediaquery } from '../ui/Wrap';
import { ButtonText } from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';

export default function MbtiTestButtonArea({
  linkCopyImageUrl,
  likeImageUrl,
  likeCount,
}: {
  linkCopyImageUrl: string;
  likeImageUrl: string;
  likeCount: number;
}) {
  const imageDetailAraay = [
    { imageUrl: linkCopyImageUrl, type: 'linkCopy', text: '링크 복사' },
    { imageUrl: likeImageUrl, type: 'like', text: '재밌당' },
    { imageUrl: MbtiTestShareImage.src, type: 'share', text: '공유하기' },
  ];
  return (
    <Wrap_mediaquery justifyContent="space-evenly">
      {imageDetailAraay.map((e, i) => (
        <ButtonTextWrap>
          <Image key={e.imageUrl + i} src={e.imageUrl} width="2rem" margin="0 0 0.2rem 0" />
          <ButtonText>{e.text}</ButtonText>
          {e.type === 'like' && <ButtonText color={FONT.COLOR.DEEPGRAY}>300</ButtonText>}
        </ButtonTextWrap>
      ))}
    </Wrap_mediaquery>
  );
}
