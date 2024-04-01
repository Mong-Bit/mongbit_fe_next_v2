'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { LogoMainSvg, SideMenuSvg, UserSvg } from '@mongbit/ui/svgs';

import { BUTTON_TYPE } from '@/constants/constant';
import { isLogIned } from '@/utils/util';
import { selectorLogInState } from '@/recoil/atoms';

import * as Types from '@/components/base/types';
import { SideMenu } from '@/components/base/SideMenu';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

const HeaderButton = styled.button<Types.HeaderButtonProp>`
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

const buttonArray = [
  {
    name: BUTTON_TYPE.HEADER_SIDEMENU,
    width: '1rem',
    height: '1rem',
    zIndex: 2,
    imageUrl: SideMenuSvg.src,
  },
  {
    name: BUTTON_TYPE.HEADER_MAINLOGO,
    width: '12rem',
    height: '4rem',
    imageUrl: LogoMainSvg.src,
  },
  {
    name: BUTTON_TYPE.HEADER_MYPAGE,
    width: '1rem',
    height: '1rem',
    imageUrl: UserSvg.src,
  },
];

export default function MyHeader() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const logInState = useRecoilValue(selectorLogInState);

  const router = useRouter();
  const goPage = (url: string) => router.push(url);

  const clickHeaderButton = (type: string, { showSideMenu, setShowSideMenu }: Types.SideMenuState) => {
    const url = isLogIned(logInState) ? '/mypage' : '/login';
    switch (type) {
      case BUTTON_TYPE.HEADER_MYPAGE:
        goPage(url);
        break;

      case BUTTON_TYPE.HEADER_MAINLOGO:
        goPage('/');
        break;

      case BUTTON_TYPE.HEADER_SIDEMENU:
        setShowSideMenu(!showSideMenu);
        break;

      default:
        router.push('/');
        break;
    }
  };

  return (
    <div>
      <Wrap_mediaquery flexDirection="row" justifyContent="space-between" alignItems="center" padding="1rem 0.5rem">
        {buttonArray.map((e, i) => (
          <HeaderButton
            key={i + e.name}
            width={e.width}
            height={e.height}
            imageUrl={e.imageUrl}
            zIndex={e.zIndex ?? 0}
            onClick={() => {
              clickHeaderButton(e.name, { showSideMenu, setShowSideMenu });
            }}
          />
        ))}
      </Wrap_mediaquery>
      <SideMenu show={{ showSideMenu, setShowSideMenu }} />
    </div>
  );
}