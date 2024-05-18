import styled from 'styled-components';

import theme from '@/styles/theme';

export const BlackDiv = styled.div<CommonStyledComponents.SideMenuDivProp>`
  background-color: black;
  transition: opacity 0.3s ease-in-out;
  position: fixed;
  top: 0;
  z-index: 1;
  width: ${theme.devices.width_420};
  height: ${(props) => `${props.height}px`};
  opacity: ${(props) => (props.$showSideMenu ? '.5' : '0')};
  pointer-events: ${(props) => (props.$showSideMenu ? 'auto' : 'none')};
`;

export const GrayDiv = styled.div<{ height: string }>`
  background-color: ${theme.colors.mediumGray};
  padding-top: 1rem;
  width: ${theme.devices.width_220};
  height: 100%;
  position: fixed;
  top: 0;
  left: calc(50% - ${parseInt(theme.devices.width_420) + 10}px);
  z-index: 3;
`;

export const WhiteDiv = styled.div`
  background-color: white;
  transition: left 0.3s ease-in-out;
  width: ${theme.devices.width_220};
  height: 100%;
  position: fixed;
  top: 0;
  left: ${(props) =>
    props.$showSideMenu
      ? `calc(50% - ${parseInt(theme.devices.width_420) / 2}px)`
      : `calc(50% - ${parseInt(theme.devices.width_420) + 10}px)`};

  z-index: 2;

  & > ul {
    margin-left: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.devices.width_375}) {
    left: ${(props) =>
      props.$showSideMenu
        ? `calc(50% - ${parseInt(theme.devices.width_420) / 2.2}px)`
        : `calc(50% - ${parseInt(theme.devices.width_420) + 10}px)`};
  }
`;
