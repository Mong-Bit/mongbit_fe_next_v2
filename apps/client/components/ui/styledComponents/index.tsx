import styled from 'styled-components';

import { FONT } from '@/constants/constant';

import { Div } from '@/components/ui/CommonElements';

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
