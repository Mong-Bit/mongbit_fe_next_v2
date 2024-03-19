import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

import { CONST_FONT, CONST_HEADER, MEDIAQUERY, LOGIN, IMAGE_ALT_STRING } from '@/constants/constant';
import { decodeToken } from '@/utils/util';
import { atomlogInState } from '@/recoil/atoms';

const SideMenuBlackDiv = styled.div`
  background-color: black;
  transition: opacity 0.3s ease-in-out;
  width: ${MEDIAQUERY.WIDTH_420};
  position: fixed;
  top: 0;
  z-index: 1;
`;

const SideMenuWhiteDiv = styled.div`
  background-color: white;
  transition: left 0.3s ease-in-out;
  width: ${CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH}px;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
`;

const ListElement = styled.li`
fontSize: CONST_FONT.SIZE.FONT_SIZE_REGULAR,
paddingBottom: '0.2rem',
fontWeight: CONST_FONT.BOLD_SCALE.SECOND,
`;

const wrapListStyle = {
  paddingTop: '1rem',
};

const contentListStyle = {
  fontSize: CONST_FONT.SIZE.FONT_SIZE_REGULAR,
  padding: '0 0 0.2rem 0.5rem',
};

const wrapBottomArea = {
  position: 'absolute',
  bottom: '0',
};

const WrapBottomLogoutArea = {
  display: 'flex',
  justifyContent: 'space-between',
  width: CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH - 60,
  color: CONST_FONT.COLOR.GRAY_1,
};

const clickLogOutButton = (setLogIn, show, router) => {
  setLogIn(false);
  show.setShowSideMenu(false);
  return router.push('/');
};

export function SideMenu({ show }) {
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const router = useRouter();
  const [height, setHeight] = useState(innerHeight);
  const [logIn, setLogIn] = useRecoilState(atomlogInState);
  const logInState = logIn[LOGIN.TOKEN_NAME] ? decodeToken(logIn[LOGIN.TOKEN_NAME]) : false;

  const onClickBlackArea = () => {
    show.setShowSideMenu(false);
  };

  const sideMenuBlacAreaStyle = {
    height,
    opacity: show.showSideMenu ? '.5' : '0',
    pointerEvents: show.showSideMenu ? '' : 'none',
  };

  const sideMenuWhiteAreaStyle = {
    left: show.showSideMenu ? `calc(50% - ${CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH}px)` : '-300px',
  };

  useEffect(() => {
    setHeight(innerHeight);
  }, [innerHeight]);

  return (
    <>
      <SideMenuBlackDiv style={sideMenuBlacAreaStyle} onClick={onClickBlackArea} />
      <SideMenuWhiteDiv style={sideMenuWhiteAreaStyle}>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li style={{ paddingTop: '3rem' }}>
            <ul>
              <ListElement>심리테스트</ListElement>
              <li style={contentListStyle}>최신보기</li>
              <li style={contentListStyle}>전체보기</li>
            </ul>
          </li>
          <li style={wrapListStyle}>
            <ul>
              <ListElement>마이페이지</ListElement>

              <li style={contentListStyle}>심테 기록 보기</li>
            </ul>
          </li>
          <li style={wrapListStyle}>
            <ul>
              <ListElement>개발자 정보</ListElement>
              <li style={contentListStyle}>몽뭉이 크루</li>
            </ul>
          </li>
          {logInState && logInState.state && (
            <ListElement style={wrapBottomArea}>
              <ul>
                {logInState && logInState.role === LOGIN.ROLE_ADMIN && (
                  <ListElement style={{ ...contentListStyle, color: CONST_FONT.COLOR.GRAY_1 }}>
                    관리자 페이지
                  </ListElement>
                )}
                <ListElement style={contentListStyle}>
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
                </ListElement>
              </ul>
            </ListElement>
          )}
        </ul>
      </SideMenuWhiteDiv>
    </>
  );
}
