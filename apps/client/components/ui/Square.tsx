import styled from 'styled-components';

import { FONT, MEDIAQUERY } from '@/constants/constant';

const MbtiTestTitleBlackSquareDiv = styled.div<{ bottom: string }>`
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

  & > p {
    color: ${FONT.COLOR.WHITE};
    font-size: ${FONT.SIZE.SMALL};
    white-space: noWrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.2rem 0.5rem 0 0.7rem;
  }
`;

export function MbtiTestTitleBlackSquareArea({ text, bottom }: { text?: string; bottom: string }) {
  return (
    <MbtiTestTitleBlackSquareDiv bottom={bottom}>
      <p>{text}</p>
    </MbtiTestTitleBlackSquareDiv>
  );
}
