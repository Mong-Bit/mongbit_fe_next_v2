import styled from 'styled-components';

import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';
import { Button } from '@/types';
import { PositionProps } from '@/types/styled';

export interface FloatButtonProps extends Omit<PositionProps, 'position'>, Button {}

const ButtonWrap = styled(L.Position)`
  z-index: 1;
`;

export const FloatButton = ({ text, onClick, ...props }: FloatButtonProps) => (
  <ButtonWrap position="fixed" {...props}>
    <B.Button
      width="40px"
      height="40px"
      fontSize={theme.font.size.s}
      color={theme.colors.black}
      onClick={onClick}
      $borderRadius="50%"
      $colorType="primary"
    >
      {text}
    </B.Button>
  </ButtonWrap>
);
