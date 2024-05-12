'use client';

import { LogoMainSvg, SideMenuSvg, UserSvg } from '@mongbit/ui/svgs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { BUTTON_TYPE } from '@/constants/constant';
import { atomloginState } from '@/recoil/atoms';
import * as B from '@/styles/base.style';
import { HeaderButton } from '@/styles/Common';
import { tokenValidate } from '@/utils/login';

import { SideMenu } from '@/components//SideMenu';

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
  const loginState = useRecoilValue(atomloginState);

  const router = useRouter();
  const goPage = (url: string) => router.push(url);

  const handleClickHeaderButton = (type: string, { showSideMenu, setShowSideMenu }) => {
    const url = tokenValidate(loginState) ? '/mypage' : '/login';
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
      <B.Wrap_mediaquery justifyContent="space-between" padding="1rem 0.5rem">
        {buttonArray.map((el, i) => (
          <HeaderButton
            key={i + el.name}
            width={el.width}
            height={el.height}
            imageUrl={el.imageUrl}
            zIndex={el.zIndex?.toString() ?? '0'}
            onClick={() => {
              handleClickHeaderButton(el.name, { showSideMenu, setShowSideMenu });
            }}
          />
        ))}
      </B.Wrap_mediaquery>
      <SideMenu show={{ showSideMenu, setShowSideMenu }} />
    </div>
  );
}
