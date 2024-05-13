import styled from 'styled-components';

import * as L from '@/styles/layout.style';
import theme from '@/styles/theme';

export const SmallTestImageWrap = styled(L.Flex)`
  width: 11rem;
  flex-direction: column;
  gap: 0.3rem;

  @media (max-width: ${theme.devices.width_375}) {
    width: 9.5rem;
  }
`;

export const SeeMoreButton = styled.button<BaseStyle.DivProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-sytle: none;
  background-color: ${(props) => props.$backgroundColor ?? props.theme.colors.primaryColor};
  width: ${(props) => props.width ?? '7rem'};
  height: ${(props) => props.height ?? '2rem'};
  border-radius: ${(props) => props.borderRadius ?? '1rem'};
  color: ${(props) => props.color ?? props.theme.colors.deepGray};
  margin: ${(props) => props.margin ?? ''};
`;

export const SquareBox = styled(L.Flex)<{ bottom: string }>`
  width: 100%;
  height: 2.5rem;
  background-color: black;
  opacity: 0.7;
  border-radius: 0 0 1rem 1rem;
  position: absolute;
  bottom: ${(props) => props.bottom ?? '0'};
  justify-content: start;
  cursor: pointer;

  & > p {
    color: ${theme.colors.white};
    font-size: ${theme.font.size.s};
    white-space: noWrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.2rem 0.5rem 0 0.7rem;
  }
`;

export const YellowKakaoLoginButton = styled.button<{ url: string }>`
  width: ${theme.devices.width_400};
  max-width: ${theme.devices.width_370};
  height: 3rem;
  background-image: ${(props) => `url(${props.url ?? ''})`};
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  margin: 5rem 0 3rem 0;
  border-style: none;

  @media (max-width: ${theme.devices.width_375}) {
    max-width: ${theme.devices.width_345};
  }
`;

export const HeaderButton = styled.button<{ $zIndex: string; $imageUrl: string; width: string; height: string }>`
  z-index: ${(props) => props.$zIndex ?? ''};
  width: ${(props) => props.width ?? ''};
  height: ${(props) => props.height ?? ''};
  border-style: none;
  background: none;
  background-image: url('${(props) => props.$imageUrl ?? ''}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 1rem;
`;
