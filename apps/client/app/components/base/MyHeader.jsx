'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { BUTTON_TYPE, CONST_HEADER } from '@/constants/constant';
import {LogoMain, SideMenu, User} from '/packages/'

import { SideMenu } from '@/components/base/SideMenu';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

import { isLogIned } from '@/utils/util';
import { selectorLogInState } from '@/recoil/atoms';

const HeaderButton = styled.button`
  width: ${(props) => props.style.width};
  height: ${(props) => props.style.height};
  border-style: none;
  background: none;
  background-image: url('${(props) => props.style.imageUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 1rem;
`;

const buttonArray = [
  {
    name: BUTTON_TYPE.HEADER_SIDEMENU,
    width: '1rem',
    height: '1rem',
    zIndex: 2,
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.SIDE_MENU_ICON,
  },
  {
    name: BUTTON_TYPE.HEADER_MAINLOGO,
    width: '12rem',
    height: '4rem',
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.MAIN_LOGO_ICON,
  },
  {
    name: BUTTON_TYPE.HEADER_MYPAGE,
    width: '1rem',
    height: '1rem',
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.USER_ICON,
  },
];

const showSideMenuSquare = ({ showSideMenu, setShowSideMenu }) => {
  setShowSideMenu(!showSideMenu);
};

export default function MyHeader() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const logInState = useRecoilValue(selectorLogInState);
  const router = useRouter();
  const clickHeaderButton = (type, router, { showSideMenu, setShowSideMenu }) => {
    if (type === BUTTON_TYPE.HEADER_MYPAGE) {
      if (isLogIned(logInState)) {
        return router.push('/mypage');
      } else {
        return router.push('/login');
      }
    }
    if (type === BUTTON_TYPE.HEADER_MAINLOGO) return router.push('/');
    if (type === BUTTON_TYPE.HEADER_SIDEMENU) showSideMenuSquare({ showSideMenu, setShowSideMenu });
  };
  return (
    <div>
      <Wrap_mediaquery flexDirection="row" justifyContent="space-between" alignitems="center" padding="1rem 0.5rem">
        {buttonArray.map((e, i) => (
          <HeaderButton
            key={i + e.name}
            style={e}
            onClick={() => {
              clickHeaderButton(e.name, router, { showSideMenu, setShowSideMenu });
            }}
          />
        ))}
      </Wrap_mediaquery>
      {/* <SideMenu show={{ showSideMenu, setShowSideMenu }} /> */}
    </div>
  );
}
