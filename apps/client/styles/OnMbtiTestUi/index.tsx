import styled from 'styled-components';

import * as L from '@/styles/layout.style';

import theme from '../theme';

export const Bar = styled.div<{ width?: string; $backgroundColor?: string }>`
  width: ${(props) => props.width ?? '100%'};
  transition: width 0.3s ease-in-out;
  height: 0.7rem;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 1rem;
  background-color: ${(props) => props.$backgroundColor ?? theme.colors.white};
  position: absolute;
  top: 1rem;
`;

export const PrevButton = styled.button`
  background-color: ${theme.colors.lightBlue};
  width: 6rem;
  height: 2.5rem;
  color: ${theme.colors.white};
  border-radius: 0.7rem;
  font-size: ${theme.font.size.s};
`;

export const Wrap = styled(L.Flex)`
  flex-direction: column;
  justify-content: start;
  width: 90%;
  height: 100%;
  gap: 3rem;
  position: relative;

  & > div:first-child {
    justify-content: start;
    padding-top: 2rem;
    flex-grow: 0.2;
  }
`;

export const ResponseBox = styled(L.Flex)`
  background-color: ${theme.colors.white};
  padding: 1.5rem 2rem;
  width: 100%;
  border-radius: 1rem;
`;
