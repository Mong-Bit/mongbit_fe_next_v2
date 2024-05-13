import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { LOGIN, IMAGE_ALT_STRING } from '@/constants/constant';
import { PATHS } from '@/constants/paths';
import { DogLogoImage } from '@/public/images/login';
import { LogOutImage } from '@/public/images/logOut';
import { atomSideMenuShow } from '@/recoil/atoms';
import * as B from '@/styles/base.style';
import { Flex, Position } from '@/styles/layout.style';
import { SideMenuBlackDiv, SideMenuWhiteDiv, SideMenuGrayDiv } from '@/styles/SideMenuUi';
import theme from '@/styles/theme';
import { decodeToken } from '@/utils/login';

const PositionBox = styled(Position)`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

export function SideMenu({ doLogOut, hideSideMenu, login }: CommonStyledComponents.SideMenuProp) {
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const [height, setHeight] = useState(0);
  const showSideMenu = useRecoilValue(atomSideMenuShow);
  const loginState = decodeToken(login[LOGIN.TOKEN_NAME]);

  const handleClickLogOut = () => {
    doLogOut();
  };

  useEffect(() => {
    setHeight(innerHeight);
  }, [innerHeight]);

  return (
    <>
      <SideMenuBlackDiv height={height} showSideMenu={showSideMenu} onClick={hideSideMenu} />
      <SideMenuGrayDiv />
      {height > 0 && (
        <SideMenuWhiteDiv showSideMenu={showSideMenu}>
          <B.ListUl>
            <li style={{ paddingTop: '3rem' }}>
              <B.ListUl gap="0">
                <B.ListItem padding="0 0 0.3rem 0" fontWeight={theme.font.bold.b}>
                  심리테스트
                </B.ListItem>
                <Link href={PATHS.LATEST} onClick={hideSideMenu}>
                  <B.ListItem>최신보기</B.ListItem>
                </Link>
                <Link href={PATHS.TOTAL} onClick={hideSideMenu}>
                  <B.ListItem>전체보기</B.ListItem>
                </Link>
              </B.ListUl>
            </li>
            <li style={{ paddingTop: '1rem' }}>
              <B.ListUl gap="0">
                <B.ListItem padding="0 0 0.3rem 0" fontWeight={theme.font.bold.b}>
                  마이페이지
                </B.ListItem>
                <Link href={PATHS.MY_PAGE} onClick={hideSideMenu}>
                  <B.ListItem>심테 기록 보기</B.ListItem>
                </Link>
              </B.ListUl>
            </li>
            <li style={{ paddingTop: '1rem' }}>
              <ul>
                <B.ListItem padding="0 0 0.3rem 0" fontWeight={theme.font.bold.b}>
                  개발자 정보
                </B.ListItem>
                <B.ListItem>몽뭉이 크루</B.ListItem>
              </ul>
            </li>
            {loginState?.state && (
              <B.ListItem login={loginState.state}>
                <PositionBox position="absolute" bottom="1.5rem">
                  <B.ListUl gap="0">
                    {loginState && loginState.role === LOGIN.ROLE_ADMIN && (
                      <B.ListItem fontWeight={theme.font.bold.b} color={theme.colors.deepGray} padding="0 0 0.5rem 0">
                        관리자 페이지
                      </B.ListItem>
                    )}
                    <PositionBox>
                      <Flex width="10rem">
                        <B.Title onClick={handleClickLogOut}>
                          <p>로그아웃</p>
                        </B.Title>
                        <B.ImageWrap>
                          <Image
                            src={LogOutImage.src}
                            alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '로그아웃 버튼'}
                            fill
                            sizes="100%"
                          />
                        </B.ImageWrap>
                      </Flex>
                      <B.ImageWrap width="100%">
                        <Image src={DogLogoImage.src} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '로고'} fill sizes="100%" />
                      </B.ImageWrap>
                    </PositionBox>
                  </B.ListUl>
                </PositionBox>
              </B.ListItem>
            )}
          </B.ListUl>
        </SideMenuWhiteDiv>
      )}
    </>
  );
}
