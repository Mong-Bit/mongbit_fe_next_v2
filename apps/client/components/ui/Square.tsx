import styled from 'styled-components';

import { MEDIAQUERY } from '@/constants/constant';

import { MbtiTestTitleBlackSquareText } from './styledComponents';

const MbtiTestTitleBlackSquareDiv = styled.div<Ui.MbtiTestTitleBlackSquareDivProp>`
  width: ${MEDIAQUERY.WIDTH_370};
  height: 2.5rem;
  background-color: black;
  opacity: 0.7;
  border-radius: 0 0 1rem 1rem;
  position: relative;
  bottom: ${(props) => props.bottom ?? ''};
  display: flex;
  align-items: center;
  cursor: pointer;
  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_340};
  }
`;

export function MbtiTestTitleBlackSquareArea({ text, bottom }: { text?: string; bottom: string }) {
  return (
    <MbtiTestTitleBlackSquareDiv bottom={bottom}>
      <MbtiTestTitleBlackSquareText>{text}</MbtiTestTitleBlackSquareText>
    </MbtiTestTitleBlackSquareDiv>
  );
}
