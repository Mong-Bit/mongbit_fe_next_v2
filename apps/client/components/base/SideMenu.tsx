import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

import * as Types from './types';
import { FONT, CONST_HEADER, MEDIAQUERY, LOGIN, IMAGE_ALT_STRING } from '@/constants/constant';
import { decodeToken } from '@/utils/util';
import { atomlogInState } from '@/recoil/atoms';

import { Wrap } from '@/components/ui/CommonElements';

const SideMenuBlackDiv = styled.div<Types.SideMenuDivProp>`
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

const SideMenuWhiteDiv = styled.div<Types.SideMenuDivProp>`
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

const SideMenuGrayDiv = styled(Wrap)`
  background-color: #f4f4f4;
  padding-top: 1rem;
  width: ${CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH}px;
  height: 100%;
  position: fixed;
  top: 0;
  left: calc(50% - ${parseInt(MEDIAQUERY.WIDTH_420) + 10}px);
  z-index: 3;
`;

const ListElementTitle = styled.li<Types.ListElementTitle>`
  font-weight: ${FONT.BOLD_SCALE.BOLD};
  position: ${(props) => (props.logIn ? 'absolute' : '')};
  bottom: ${(props) => (props.logIn ? '0' : '')};
  font-size: ${(props) => props.fontSize ?? FONT.SIZE.MEDIUM};
  padding: ${(props) => props.padding ?? ''};
`;

const ListElementContent = styled.li`
  font-size: ${FONT.SIZE.MEDIUM};
  padding: 0 0 0.2rem 0.5rem;
`;

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
                    <ListElementTitle>관리자 페이지</ListElementTitle>
                  )}
                  <ListElementTitle fontSize={FONT.SIZE.MEDIUM} padding="0 0 0.2rem 0.5rem">
                    <div style={WrapBottomLogoutArea}>
                      <div onClick={() => clickLogOutButton(setLogIn, show, router)}>
                        <span>로그아웃</span>
                        <img
                          src="/images/header/logOutIcon.svg"
                          alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '로그아웃 버튼'}
                          style={{ position: 'absolute', top: '1.6rem', paddingLeft: '0.2rem' }}
                        />
                      </div>
                      <img
                        src="/images/header/logo_dog.svg"
                        alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '로고'}
                        style={{ width: '60px' }}
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
