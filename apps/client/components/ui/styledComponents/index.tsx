import styled from 'styled-components';

import { FONT } from '@/constants/constant';

import { Div, Text } from '@/components/ui/CommonElements';

// MbtiTest.tsx
export const WrapForMbtiTestViewPage = styled(Div)`
  margin: 1rem 0 0 0;
`;

export const WrapForSmallMbtiTestContent = styled(Div)`
  padding: ${(props) => props.padding ?? ''};
  display: ${(props) => props.display ?? ''};
  justify-content: ${(props) => props.justifyContent ?? ''};
  align-items: ${(props) => props.alignItems ?? ''};
`;

export const TitleText = styled(Text)`
  cursor: pointer;
  color: ${FONT.COLOR.DARKGRAY};
  width: 10rem;
  padding: 0 0 0 0.2rem;
  font-size: ${FONT.SIZE.SMALL};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContentText = styled(Text)`
  font-size: ${FONT.SIZE.SMALL};
  color: ${FONT.COLOR.DARKGRAY};
  display: inline-block;
  margin-left: 0.2rem;
  cursor: pointer;
`;

// Button.tsx
export const SeeMoreButtonWrap = styled(Div)`
  background-color: ${FONT.COLOR.LIGHTGRAY};
  width: 7rem;
  height: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SeeMoreButtonText = styled(Text)`
  color: ${FONT.COLOR.DEEPGRAY};
  fontsize: ${FONT.SIZE.SMALL};
`;

// Square.tsx
export const MbtiTestTitleBlackSquareText = styled(Text)`
  color: ${FONT.COLOR.WHITE};
  font-size: ${FONT.SIZE.SMALL};
  white-space: noWrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.2rem 0.5rem 0 0.7rem;
`;
