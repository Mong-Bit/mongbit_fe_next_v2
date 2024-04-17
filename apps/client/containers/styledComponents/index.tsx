import styled from 'styled-components';

import { FONT, MEDIAQUERY } from '@/constants/constant';

import { YellowButton } from '@/components/ui/Button';
import { Text, Div } from '@/components/ui/CommonElements';

// Main
export const RandomStartYellowButton = styled(YellowButton)`
  margin: 1rem 0;
  width: ${MEDIAQUERY.WIDTH_370};
  height: 2.5rem;
  font-size: ${FONT.SIZE.LARGE};

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
`;

// needLogin
export const YellowKakaoLoginButton = styled.button<Containers.Url>`
  width: ${MEDIAQUERY.WIDTH_400};
  max-width: ${MEDIAQUERY.WIDTH_370};
  height: 3rem;
  background-image: ${(props) => `url(${props.url ?? ''})`};
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  margin: 5rem 0 3rem 0;
  border-style: none;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    max-width: ${MEDIAQUERY.WIDTH_345};
  }
`;

export const ContentText = styled(Text)`
  font-size: ${(props) => props.fontSize ?? FONT.SIZE.MEDIUM};
  font-weight: ${(props) => props.fontWeight ?? FONT.BOLD_SCALE.MEDIUM};
  padding: ${(props) => props.padding ?? ''};
`;

// PreviewMbtiTest
export const MbtiTEstCountIconImageWrap = styled(Div)`
  display: flex;
  flex-direction: row;
  color: ${FONT.COLOR.DARKGRAY};
  width: ${MEDIAQUERY.WIDTH_370};
`;

export const ContentTextWrap = styled(Div)`
  width: ${MEDIAQUERY.WIDTH_370};
  display: flex;
  flex-direction: column;
  color: ${FONT.COLOR.DEEPGRAY};
`;

export const MbtiTestStartButton = styled(YellowButton)`
  width: ${MEDIAQUERY.WIDTH_370};
  height: 2.5rem;
  font-size: ${FONT.SIZE.LARGE};
  margin: 2rem 0 1rem 0;
`;
