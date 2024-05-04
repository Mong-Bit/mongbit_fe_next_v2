import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { FONT, MBTI_TEST_BUTTON_TYPE } from '@/constants/constant';
import { MbtiTestShareImage } from '@/public/images/mbtiTest';
import { MbtiTestLinkCopyImage, MbtiTestLinkCopiedImage } from '@/public/images/mbtiTest';
import { atomlogInState } from '@/recoil/atoms';
import { tokenValidate } from '@/utils/logIn';
import { updateLikeNumber } from '@/utils/mbtiTest';

import { ButtonTextWrap } from './styledComponents';
import { Wrap_mediaquery } from '../ui/Wrap';
import { ButtonText } from '@/components/base/styledComponents';
import { Image } from '@/components/ui/CommonElements';

export default function MbtiTestButtonArea({ data }: Base.MbtiTestButtonAreaProp) {
  const router = useRouter();
  const logInState = useRecoilValue(atomlogInState);
  const [linkCopyState, setLinkCopyState] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likeCount);

  const imageDetailAraay = [
    {
      imageUrl: linkCopyState ? MbtiTestLinkCopiedImage.src : MbtiTestLinkCopyImage.src,
      type: MBTI_TEST_BUTTON_TYPE.LINK_COPY,
      text: linkCopyState ? '링크 복사됨' : '링크 복사',
    },
    { imageUrl: data.likeImageUrl, type: MBTI_TEST_BUTTON_TYPE.LIKE, text: '재밌당' },
    { imageUrl: MbtiTestShareImage.src, type: MBTI_TEST_BUTTON_TYPE.SHARE, text: '공유하기' },
  ];

  const handleClickButton = (buttonType: string) => {
    const isTokenValid = tokenValidate(logInState);

    switch (buttonType) {
      case MBTI_TEST_BUTTON_TYPE.LINK_COPY:
        setLinkCopyState(true);
        break;

      case MBTI_TEST_BUTTON_TYPE.LIKE:
        if (isTokenValid) {
          const needMinusValue = data.likeState;

          if (likeCount) setLikeCount(needMinusValue ? likeCount - 1 : likeCount + 1); // ui 리랜더링
          updateLikeNumber(data.likeState, data.testId, data.memberId); // api 요청

          data.setLikeState(!data.likeState);
        } else router.push('/login');
        break;

      default:
        return;
    }
  };

  return (
    <Wrap_mediaquery justifyContent="space-evenly">
      {imageDetailAraay.map((e, i) => (
        <ButtonTextWrap key={e.imageUrl + i}>
          <Image src={e.imageUrl} width="2rem" margin="0 0 0.2rem 0" onClick={() => handleClickButton(e.type)} />
          <ButtonText>{e.text}</ButtonText>
          {e.type === MBTI_TEST_BUTTON_TYPE.LIKE && <ButtonText color={FONT.COLOR.DEEPGRAY}>{likeCount}</ButtonText>}
        </ButtonTextWrap>
      ))}
    </Wrap_mediaquery>
  );
}
