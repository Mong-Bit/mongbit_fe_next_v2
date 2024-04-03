'use client';
import Link from 'next/link';

import { DOMAIN_BE_PROD, IMAGE_ALT_STRING, FONT } from '@/constants/constant';
import { DogLogoImage, KakaoLogInButtonImage } from '@/public/images/logIn';
import { YellowKakaoLoginButton } from '@/containers/styledComponents';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { Text, Wrap, Image } from '@/components/ui/CommonElements';

export default function Login() {
  // console.log(process.env.NEXT_PUBLIC_FE_URL);
  // console.log(process.env.NODE_ENV);
  const url = process.env.NEXT_PUBLIC_FE_URL
    ? `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=${process.env.NEXT_PUBLIC_FE_URL}/login/oauth2/kakao/code&response_type=code`
    : `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=${DOMAIN_BE_PROD}/login/oauth2/kakao/code&response_type=code`;

  // const kakaoLogin = () => {
  //   window.location.href = url;
  // };

  // 어드민
  // useEffect(() => {
  //   addDailyVisitCount();
  // }, []);

  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center" padding="3rem 0 0 0 ">
      <Text fontSize={FONT.SIZE.MEDIUM} color={FONT.COLOR.BLACK}>
        3초만에 로그인하고
      </Text>
      <Wrap
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color={FONT.COLOR.BLACK}
        margin="1rem 0 0 0"
      >
        <Text fontSize={FONT.SIZE.EXTRA_LARGE} fontWeight={FONT.BOLD_SCALE.BOLD} padding="0 0 0.3rem 0">
          무료로 성격 검사
        </Text>
        <Text fontSize={FONT.SIZE.EXTRA_LARGE} fontWeight={FONT.BOLD_SCALE.BOLD}>
          친구에게 공유까지
        </Text>
      </Wrap>

      <Image
        src={DogLogoImage.src}
        alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '카카오 로그인 아이콘'}
        width="11rem"
        margin="4rem 0 1rem 0"
      />

      <Text color={FONT.COLOR.DARKGRAY} fontSize={FONT.SIZE.EXTRA_SMALL}>
        © 2023 MongMoongCrew. All rights reserved
      </Text>
      <Link href={url}>
        <YellowKakaoLoginButton url={KakaoLogInButtonImage.src} />
      </Link>
    </Wrap_mediaquery>
  );
}
