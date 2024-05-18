import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { Button } from '@/types';
import { PositionProps } from '@/types/styled';

export interface FloatButtonProps extends Omit<PositionProps, 'position'>, Button {}

const ButtonWrap = styled(L.Position)`
  z-index: 50;
`;

export const FloatButton = ({ text, onClick, ...props }: FloatButtonProps) => (
  <ButtonWrap position="fixed" {...props}>
    <B.Button
      width="40px"
      height="40px"
      borderRadius="50%"
      fontSize={theme.font.size.s}
      color={theme.colors.black}
      backgroundColor=" #ffc42fd7"
      onClick={onClick}
    >
      {text}
    </B.Button>
  </ButtonWrap>
);
