'use client';
import Image from 'next/image';
import { styled } from 'styled-components';

import { IMAGE_ALT_STRING } from '@/constants/constant';
import { DogLogoImage, KakaoLogInButtonImage } from '@/public/images/login';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

const TextWrap = styled(L.Flex)`
  flex-direction: column;
  margin-top: 1rem;
`;

const YellowKakaoLoginButton = styled.button`
  width: ${theme.devices.width_400};
  height: 3rem;
  background-image: url(${KakaoLogInButtonImage.src});
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  margin: 5rem 0 3rem 0;
  border-style: none;

  @media (max-width: ${theme.devices.width_375}) {
    max-width: ${theme.devices.width_310};
  }
`;

const redirectKakaoLogin = () => {
  if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_FE_URL_CLIENT ?? process.env.NEXT_PUBLIC_FE_URL_PROD}/login/oauth2/kakao/code&response_type=code`;
};

export default function Login() {
  return (
    <B.Wrap_mediaquery $flexDirection="column" $justifyContent="center" $alignItems="center" padding="3rem 0 0 0 ">
      <B.Text color={theme.colors.black}>3초만에 로그인하고</B.Text>
      <TextWrap>
        <B.Text color={theme.colors.black} fontSize={theme.font.size.xl} fontWeight={theme.font.bold.b}>
          무료로 성격 검사
        </B.Text>
        <B.Text color={theme.colors.black} fontSize={theme.font.size.xl} fontWeight={theme.font.bold.b}>
          친구에게 공유까지
        </B.Text>
      </TextWrap>

      <B.ImageWrap width="11rem" height="10rem" margin="4rem 0 1rem 0">
        <Image src={DogLogoImage.src} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '카카오 로그인 아이콘'} sizes="100%" fill />
      </B.ImageWrap>

      <B.Text color={theme.colors.darkGray} fontSize={theme.font.size.xs}>
        © 2023 MongMoongCrew. All rights reserved
      </B.Text>

      <YellowKakaoLoginButton onClick={redirectKakaoLogin} />
    </B.Wrap_mediaquery>
  );
}
