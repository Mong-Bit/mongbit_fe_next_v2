import styled from 'styled-components';

import { SeeMoreIconImage } from '@/public/images/mbtiTest';
import { IMAGE_ALT_STRING, BUTTON_TYPE, FONT } from '@/constants/constant';

import { Wrap, Image, Text } from '@/components/ui/CommonElements';
import * as Types from '@/components/ui/types/button';

const MbtiTestCountIconImg = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  src=${(props) => props.src ?? ''}
`;

export function MbtiTestCountIconImage({ imageUrl }: Types.Image) {
  return <MbtiTestCountIconImg src={imageUrl} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '카운트 정보'} />;
}

export function SeeMoreButton({ onClick }: Types.SeeMoreButtonProp) {
  return (
    <Wrap
      backgroundColor={FONT.COLOR.LIGHTGRAY}
      width="7rem"
      height="2rem"
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
    >
      <Text color={FONT.COLOR.DEEPGRAY} fontSize={FONT.SIZE.SMALL}>
        더보기
      </Text>
      <Image src={SeeMoreIconImage.src} alt={`${IMAGE_ALT_STRING} 더보기 버튼`} width="0.8rem" />
    </Wrap>
  );
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
