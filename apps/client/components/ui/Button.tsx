import styled from 'styled-components';

import { IMAGE_ALT_STRING, BUTTON_TYPE } from '@/constants/constant';
import { SeeMoreIconImage } from '@/public/images/mbtiTest';

import { Image } from '@/components/ui/CommonElements';
import { SeeMoreButtonWrap } from '@/components/ui/styledComponents';

const MbtiTestCountIconImg = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  src=${(props) => props.src ?? ''}
`;

export const YellowButton = styled.button`
  border-radius: 1rem;
  border-style: none;
  background-color: ${BUTTON_TYPE.YELLOW_BUTTON.BACKGROUND_COLOR};
  transition: ${BUTTON_TYPE.YELLOW_BUTTON.TRANSITION};
  color: ${BUTTON_TYPE.YELLOW_BUTTON.FONT_COLOR};
  cursor: pointer;

  &:hover {
    background-color: ${BUTTON_TYPE.YELLOW_BUTTON.HOVER_BACKGROUND_COLOR};
  }
`;

export function MbtiTestCountIconImage({ imageUrl }: Ui.Image) {
  return <MbtiTestCountIconImg src={imageUrl} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '카운트 정보'} />;
}

export function SeeMoreButton({ onClick }: Ui.SeeMoreButtonProp) {
  return (
    <SeeMoreButtonWrap onClick={onClick}>
      <p>더보기</p>
      <Image src={SeeMoreIconImage.src} alt={IMAGE_ALT_STRING + '더보기 버튼'} width="0.8rem" />
    </SeeMoreButtonWrap>
  );
}
