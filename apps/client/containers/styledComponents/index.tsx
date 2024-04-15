import styled from 'styled-components';

import { FONT, MEDIAQUERY } from '@/constants/constant';

import { YellowButton } from '@/components/ui/Button';
import * as Types from '@/containers/types/logIn';

// main
export const RandomStartYellowButton = styled(YellowButton)`
  margin: 1rem 0;
  border-radius: 1rem;
  width: ${MEDIAQUERY.WIDTH_370};
  height: 2.5rem;
  border-style: none;
  font-size: ${FONT.SIZE.LARGE};

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
`;

// login
export const YellowKakaoLoginButton = styled.button<Types.url>`
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
