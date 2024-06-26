import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { DOMAIN_FE_PROD, IMAGE_ALT_STRING, MBTI_TEST_BUTTON_TYPE } from '@/constants/constant';
import { ShareImage } from '@/public/images/mbtiTest';
import { LinkCopyImage, LinkCopiedImage } from '@/public/images/mbtiTest';
import { atomloginState } from '@/recoil/atoms';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { tokenValidate } from '@/utils/login';
import { updateLikeNumber } from '@/utils/mbtiTest';
import { shareToKakaotalk_mbtiTest } from '@/utils/mbtiTest';

export default function ButtonArea({ data, shareDetail }: Base.ButtonAreaProp) {
  const router = useRouter();
  const pathname = usePathname();
  const loginState = useRecoilValue(atomloginState);
  const [linkCopyState, setLinkCopyState] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likeCount);

  const imageDetailAraay = [
    {
      imageUrl: linkCopyState ? LinkCopiedImage.src : LinkCopyImage.src,
      type: MBTI_TEST_BUTTON_TYPE.LINK_COPY,
      text: linkCopyState ? '링크 복사됨' : '링크 복사',
    },
    { imageUrl: data.likeImageUrl, type: MBTI_TEST_BUTTON_TYPE.LIKE, text: '재밌당' },
    { imageUrl: ShareImage.src, type: MBTI_TEST_BUTTON_TYPE.SHARE, text: '공유하기' },
  ];

  const handleClickButton = (buttonType: string) => {
    const isTokenValid = tokenValidate(loginState);
    const url = `${DOMAIN_FE_PROD}${pathname}`;

    switch (buttonType) {
      case MBTI_TEST_BUTTON_TYPE.LINK_COPY:
        navigator.clipboard.writeText(url);
        setLinkCopyState(true);
        break;

      case MBTI_TEST_BUTTON_TYPE.LIKE:
        if (isTokenValid) {
          const needMinusValue = data.likeState;

          if (likeCount !== null) setLikeCount(needMinusValue ? likeCount - 1 : likeCount + 1); // ui 리랜더링
          updateLikeNumber(data.likeState, data.testId, data.memberId); // api 요청

          data.setLikeState(!data.likeState);
        } else router.push('/login');
        break;

      case MBTI_TEST_BUTTON_TYPE.SHARE:
        shareToKakaotalk_mbtiTest(
          data.testId,
          data.memberId,
          'type',
          shareDetail.mbtiTestTitle,
          shareDetail.imageUrl,
          data.likeCount,
        );
        break;
      default:
        return;
    }
  };

  return (
    <B.Wrap_mediaquery gap="4rem" $alignItems="baseline" padding="2rem 1.5rem">
      {imageDetailAraay.map((el, i) => (
        <L.Flex $flexDirection="column" gap="0.5rem" key={el.text + i}>
          <B.ImageWrap width="2.5rem" height="2.5rem" onClick={() => handleClickButton(el.type)}>
            <Image src={el.imageUrl} alt={IMAGE_ALT_STRING + '코멘트 아이콘'} fill sizes="100%" />
          </B.ImageWrap>
          <B.Text>{el.text}</B.Text>
          {el.type === MBTI_TEST_BUTTON_TYPE.LIKE && <B.Text color={theme.colors.deepGray}>{likeCount}</B.Text>}
        </L.Flex>
      ))}
    </B.Wrap_mediaquery>
  );
}
