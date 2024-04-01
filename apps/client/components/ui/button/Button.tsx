import styled from 'styled-components';

import { IMAGE_ALT_STRING, BUTTON_TYPE } from '@/constants/constant';

import * as Types from '@/components/ui/types/button';

const TestCountIconImg = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  src=${(props) => props.src ?? ''}
`;

export function TestCountIconImage({ imageUrl }: Types.Image) {
  return <TestCountIconImg src={imageUrl} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '카운트 정보'} />;
}

export const YellowButton = styled.button`
  background-color: ${BUTTON_TYPE.YELLOW_BUTTON.BACKGROUND_COLOR};
  transition: ${BUTTON_TYPE.YELLOW_BUTTON.TRANSITION};
  color: ${BUTTON_TYPE.YELLOW_BUTTON.FONT_COLOR};
  cursor: pointer;

  &:hover {
    background-color: ${BUTTON_TYPE.YELLOW_BUTTON.HOVER_BACKGROUND_COLOR};
  }
`;
