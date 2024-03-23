import styled from 'styled-components';

import { IMAGE_ALT_STRING, TEST_ICON, YELLOW_BUTTON } from '@/constants/constant';
import * as Types from '../types';

const TestCountIconImg = styled.img`
  width: ${TEST_ICON.SIZE.WIDTH};
  height: ${TEST_ICON.SIZE.HEIGHT};
  cursor: pointer;
  src=${(props) => props.src ?? ''}
`;

export function TestCountIconImage({ imageUrl }: Types.Image) {
  return <TestCountIconImg src={imageUrl} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '카운트 정보'} />;
}

export const YellowButton = styled.button`
  background-color: ${YELLOW_BUTTON.BACKGROUND_COLOR};
  transition: ${YELLOW_BUTTON.TRANSITION};
  color: ${YELLOW_BUTTON.FONT_COLOR};
`;
