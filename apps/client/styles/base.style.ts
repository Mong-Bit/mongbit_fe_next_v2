import styled, { CSSProperties } from 'styled-components';

import * as Style from '@/types/styled';

import { Flex } from './layout.style';
import theme from './theme';

// base web
export const Wrap_mediaquery = styled(Flex)`
  width: ${(props) => props.theme.devices.width_420};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor ?? props.theme.colors.bgColor};
  padding: ${(props) => props.padding ?? '1rem 1.5rem'};
  margin: ${(props) => props.margin};
  position: ${(props) => props.position};

  @media (max-width: ${(props) => props.theme.devices.width_375}) {
    width: ${(props) => props.theme.devices.width_375};
  }
`;

// img
export const IconImage = styled.img<CSSProperties>`
  width: ${(props) => props.width ?? '1rem'};
  height: ${(props) => props.height ?? '1rem'};
  margin: ${(props) => props.margin ?? 'auto'};
`;

export const ImageWrap = styled.div<CSSProperties>`
  width: ${(props) => props.width ?? '1rem'};
  height: ${(props) => props.height ?? '1rem'};
  border-radius: ${(props) => props.borderRadius};
  overflow: hidden;
  position: relative;
  object-fit: cover;
  margin: ${(props) => props.margin ?? ''};
`;

// font
export const Text = styled.p<CSSProperties>`
  color: ${(props) => props.color ?? props.theme.colors.darkGray};
  font-size: ${(props) => props.fontSize ?? props.theme.font.size.s};
  font-weight: ${(props) => props.fontWeight ?? props.theme.font.bold.n};
  margin: ${(props) => props.margin};
`;

export const TextEllipsis = styled(Text)`
  white-space: ${(props) => props.whiteSpace ?? 'nowrap'};
  overflow: ${(props) => props.overflow ?? 'hidden'};
  text-overflow: ellipsis;
`;

export const Title = styled.div<CSSProperties>`
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  margin: ${(props) => props.margin ?? ''};

  h3 {
    text-align: ${(props) => props.textAlign ?? ''};
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.font.size.xl};
    font-weight: ${(props) => props.theme.font.bold.b};
    margin-bottom: 5px;
  }
  p {
    text-align: ${(props) => props.textAlign ?? ''};
    color: ${(props) => props.theme.colors.darkGray};
    font-size: ${(props) => props.theme.font.size.m};
    font-weight: ${(props) => props.theme.font.bold.n};
  }
`;

// button
export const Button = styled.button<CSSProperties>`
  width: ${(props) => props.width ?? props.theme.devices.width_370};
  height: ${(props) => props.height ?? '2.5rem'};
  font-size: ${(props) => props.fontSize ?? props.theme.font.size.l};
  box-shadow: ${(props) => props.boxShadow ?? ''};
  color: ${(props) => props.color ?? props.theme.colors.white};
  background-color: ${(props) => props.backgroundColor ?? props.theme.colors.primaryColor};
  border-radius: ${(props) => props.borderRadius ?? '1rem'};
  margin: ${(props) => props.margin ?? ''};

  cursor: pointer;
  ${theme.transition}

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryColorHover ?? ''};
  }

  @media (max-width: ${theme.devices.width_375}) {
    width: ${(props) => props.width ?? theme.devices.width_345};
  }
`;

// list
export const ListUl = styled.ul<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap ?? '25px'};
`;

export const ListItem = styled.li<CSSProperties>`
  font-weight: ${(props) => props.fontWeight ?? theme.font.bold.n};
  font-size: ${(props) => props.fontSize ?? theme.font.size.m};
  padding: ${(props) => props.padding ?? ''};
  color: ${(props) => props.color ?? theme.colors.black};
`;

export const DividingLine = styled.div<{ backgroundColor: string; margin: string }>`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.lightGray};
  margin: ${(props) => props.margin ?? ''};
`;
