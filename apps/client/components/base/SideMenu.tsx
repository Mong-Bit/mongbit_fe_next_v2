import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

import { FONT, CONST_HEADER, LOGIN, IMAGE_ALT_STRING } from '@/constants/constant';
import { decodeToken } from '@/utils/util';
import { atomlogInState } from '@/recoil/atoms';
import { DogLogoImage } from '@/public/images/logIn';
import { LogOutImage } from '@/public/images/logOut';

import {
  SideMenuBlackDiv,
  SideMenuWhiteDiv,
  SideMenuGrayDiv,
  ListElementTitle,
  ListElementContent,
} from '@/components/styledComponents';
import { Text, Wrap } from '@/components/ui/CommonElements';
import * as Types from '@/components/base/types';

const WrapBottomLogoutArea = {
  display: 'flex',
  justifyContent: 'space-between',
  width: CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH - 60,
  color: FONT.COLOR.DARKGRAY,
};

const clickLogOutButton = (setLogIn: Types.SetLogIn, show: Types.Show, router: Types.Router) => {
  setLogIn(false);
  show.setShowSideMenu(false);
  return router.push('/');
};

export function SideMenu({ show }: Types.SideMenuProp) {
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const router = useRouter();
  const [height, setHeight] = useState(0);
  const [logIn, setLogIn] = useRecoilState(atomlogInState);
  const logInState = logIn[LOGIN.TOKEN_NAME] ? decodeToken(logIn[LOGIN.TOKEN_NAME]) : false;

  const onClickBlackArea = () => {
    show.setShowSideMenu(false);
  };

  useEffect(() => {
    setHeight(innerHeight);
  }, [innerHeight]);

  return (
    <>
      <SideMenuBlackDiv height={height.toString()} show={show} onClick={onClickBlackArea} />
      <SideMenuGrayDiv height={height.toString()} />
      {height > 0 && (
        <SideMenuWhiteDiv show={show}>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li style={{ paddingTop: '3rem' }}>
              <ul>
                <ListElementTitle padding="0 0 0.3rem 0">심리테스트</ListElementTitle>
                <ListElementContent>최신보기</ListElementContent>
                <ListElementContent>전체보기</ListElementContent>
              </ul>
            </li>
            <li style={{ paddingTop: '1rem' }}>
              <ul>
                <ListElementTitle padding="0 0 0.3rem 0">마이페이지</ListElementTitle>

                <ListElementContent>심테 기록 보기</ListElementContent>
              </ul>
            </li>
            <li style={{ paddingTop: '1rem' }}>
              <ul>
                <ListElementTitle padding="0 0 0.3rem 0">개발자 정보</ListElementTitle>
                <ListElementContent>몽뭉이 크루</ListElementContent>
              </ul>
            </li>
            {logInState && logInState.state && (
              <ListElementTitle logIn={logInState.state}>
                <ul>
                  {logInState && logInState.role === LOGIN.ROLE_ADMIN && (
                    <Text fontSize={FONT.SIZE.MEDIUM} fontWeight={FONT.BOLD_SCALE.BOLD} color={FONT.COLOR.DARKGRAY}>
                      관리자 페이지
                    </Text>
                  )}
                  <ListElementTitle fontSize={FONT.SIZE.MEDIUM} padding="0 0 0.2rem 0">
                    <div style={WrapBottomLogoutArea}>
                      <Wrap padding="0.7rem 0 0.5rem 0" onClick={() => clickLogOutButton(setLogIn, show, router)}>
                        <Text fontSize={FONT.SIZE.MEDIUM} color={FONT.COLOR.DARKGRAY}>
                          로그아웃
                        </Text>
                        <img
                          src={LogOutImage.src}
                          alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '로그아웃 버튼'}
                          style={{ position: 'absolute', top: '1.7rem', right: '50%', paddingLeft: '0.2rem' }}
                        />
                      </Wrap>
                      <img
                        src={DogLogoImage.src}
                        alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '로고'}
                        style={{ width: '3.5rem' }}
                      />
                    </div>
                  </ListElementTitle>
                </ul>
              </ListElementTitle>
            )}
          </ul>
        </SideMenuWhiteDiv>
      )}
    </>
  );
}
