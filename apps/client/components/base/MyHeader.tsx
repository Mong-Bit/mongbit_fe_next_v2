'use client';

import { LogoMainSvg, SideMenuSvg, UserSvg } from '@mongbit/ui/svgs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { BUTTON_TYPE } from '@/constants/constant';
import { atomlogInState } from '@/recoil/atoms';
import { tokenValidate } from '@/utils/logIn';

import { SideMenu } from '@/components/base/SideMenu';
import { HeaderButton } from '@/components/base/styledComponents';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

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
  const logInState = useRecoilValue(atomlogInState);

  const router = useRouter();
  const goPage = (url: string) => router.push(url);

  const handleClickHeaderButton = (
    type: string,
    { showSideMenu, setShowSideMenu }: CommonStyledComponents.SideMenuState,
  ) => {
    const url = tokenValidate(logInState) ? '/mypage' : '/login';
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
        {buttonArray.map((el, i) => (
          <HeaderButton
            key={i + el.name}
            width={el.width}
            height={el.height}
            imageUrl={el.imageUrl}
            zIndex={el.zIndex ?? 0}
            onClick={() => {
              handleClickHeaderButton(el.name, { showSideMenu, setShowSideMenu });
            }}
          />
        ))}
      </Wrap_mediaquery>
      <SideMenu show={{ showSideMenu, setShowSideMenu }} />
    </div>
  );
}
