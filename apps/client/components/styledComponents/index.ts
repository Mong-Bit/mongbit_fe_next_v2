import styled from 'styled-components';

import { FONT, MEDIAQUERY, CONST_HEADER } from '@/constants/constant';

import { Text } from '@/components/ui/CommonElements';
import { Wrap } from '@/components/ui/CommonElements';

// MyHeader.tsx
export const HeaderButton = styled.button<StyledComponents.HeaderButtonProp>`
  width: ${(props) => props.width ?? ''};
  height: ${(props) => props.height ?? ''};
  z-index: ${(props) => props.zIndex ?? ''};
  border-style: none;
  background: none;
  background-image: url('${(props) => props.imageUrl ?? ''}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 1rem;
`;

// MyFooter.tsx
export const PolicyText = styled(Text)`
  margin-right: 0.5rem;
  font-size: ${FONT.SIZE.EXTRA_SMALL};
  color: ${FONT.COLOR.DEEPGRAY};
`;

export const CopyrightText = styled(Text)`
  position: absolute;
  right: 0;
  bottom: 1.5rem;
  padding: 0.2rem 1.5rem 0 0;
  font-size: ${FONT.SIZE.EXTRA_SMALL};
  color: ${FONT.COLOR.DEEPGRAY};
`;

// SideMenu.tsx
export const SideMenuBlackDiv = styled.div<StyledComponents.SideMenuDivProp>`
  background-color: black;
  transition: opacity 0.3s ease-in-out;
  position: fixed;
  top: 0;
  z-index: 1;
  width: ${MEDIAQUERY.WIDTH_420};
  height: ${(props) => `${props.height}px`};
  opacity: ${(props) => (props.show?.showSideMenu ? '.5' : '0')};
  pointer-events: ${(props) => (props.show?.showSideMenu ? 'auto' : 'none')};
`;

export const SideMenuWhiteDiv = styled.div<StyledComponents.SideMenuDivProp>`
  background-color: white;
  transition: left 0.3s ease-in-out;
  width: ${CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH}px;
  height: 100%;
  position: fixed;
  top: 0;
  left: ${(props) =>
    props.show?.showSideMenu
      ? `calc(50% - ${parseInt(MEDIAQUERY.WIDTH_420) / 2}px)`
      : `calc(50% - ${parseInt(MEDIAQUERY.WIDTH_420) + 10}px)`};
  z-index: 2;
`;

export const SideMenuGrayDiv = styled(Wrap)`
  background-color: #f4f4f4;
  padding-top: 1rem;
  width: ${CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH}px;
  height: 100%;
  position: fixed;
  top: 0;
  left: calc(50% - ${parseInt(MEDIAQUERY.WIDTH_420) + 10}px);
  z-index: 3;
`;

export const ListElementTitle = styled.li<StyledComponents.ListElementTitle>`
  font-weight: ${FONT.BOLD_SCALE.BOLD};
  position: ${(props) => (props.logIn ? 'absolute' : '')};
  bottom: ${(props) => (props.logIn ? '0' : '')};
  font-size: ${(props) => props.fontSize ?? FONT.SIZE.MEDIUM};
  padding: ${(props) => props.padding ?? ''};
`;

export const ListElementContent = styled.li`
  font-size: ${FONT.SIZE.MEDIUM};
  padding: 0 0 0.2rem 0.5rem;
`;
