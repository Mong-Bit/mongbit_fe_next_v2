import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { FONT, LOGIN, IMAGE_ALT_STRING } from '@/constants/constant';
import { DogLogoImage } from '@/public/images/logIn';
import { LogOutImage } from '@/public/images/logOut';
import { atomlogInState } from '@/recoil/atoms';
import { decodeToken } from '@/utils/logIn';

import {
  SideMenuBlackDiv,
  SideMenuWhiteDiv,
  SideMenuGrayDiv,
  ListElementTitle,
  ListElementContent,
  WrapForText,
  WrapBottomLogoutArea,
  AdminAreaText,
} from '@/components/base/styledComponents';

const clickLogOutButton = (
  setLogIn: StyledComponents.SetLogIn,
  show: StyledComponents.Show,
  router: StyledComponents.Router,
) => {
  setLogIn(false);
  show.setShowSideMenu(false);
  return router.push('/');
};

export function SideMenu({ show }: StyledComponents.SideMenuProp) {
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const router = useRouter();
  const [height, setHeight] = useState(0);
  const [logIn, setLogIn] = useRecoilState(atomlogInState);
  const logInState = decodeToken(logIn[LOGIN.TOKEN_NAME]);

  const hideSideMenu = () => {
    show.setShowSideMenu(false);
  };

  useEffect(() => {
    setHeight(innerHeight);
  }, [innerHeight]);

  return (
    <>
      <SideMenuBlackDiv height={height.toString()} show={show} onClick={hideSideMenu} />
      <SideMenuGrayDiv height={height.toString()} />
      {height > 0 && (
        <SideMenuWhiteDiv show={show}>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li style={{ paddingTop: '3rem' }}>
              <ul>
                <ListElementTitle padding="0 0 0.3rem 0">심리테스트</ListElementTitle>
                <Link href="/mbtiTest/latest" onClick={hideSideMenu}>
                  <ListElementContent>최신보기</ListElementContent>
                </Link>
                <Link href="/mbtiTest/total" onClick={hideSideMenu}>
                  <ListElementContent>전체보기</ListElementContent>
                </Link>
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
            {logInState?.state && (
              <ListElementTitle logIn={logInState.state}>
                <ul>
                  {logInState && logInState.role === LOGIN.ROLE_ADMIN && (
                    <AdminAreaText fontWeight={FONT.BOLD_SCALE.BOLD}>관리자 페이지</AdminAreaText>
                  )}
                  <ListElementTitle fontSize={FONT.SIZE.MEDIUM} padding="0 0 0.2rem 0">
                    <WrapBottomLogoutArea>
                      <WrapForText>
                        <AdminAreaText onClick={() => clickLogOutButton(setLogIn, show, router)}>
                          로그아웃
                        </AdminAreaText>
                        <img
                          src={LogOutImage.src}
                          alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '로그아웃 버튼'}
                          style={{
                            position: 'absolute',
                            top: logInState.role === LOGIN.ROLE_ADMIN ? '1.7rem' : '0.7rem',
                            right: '50%',
                            paddingLeft: '0.2rem',
                          }}
                        />
                      </WrapForText>
                      <img
                        src={DogLogoImage.src}
                        alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '로고'}
                        style={{ width: '3.5rem' }}
                      />
                    </WrapBottomLogoutArea>
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
