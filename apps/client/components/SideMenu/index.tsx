import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { LOGIN, IMAGE_ALT_STRING } from '@/constants/constant';
import { PATHS } from '@/constants/paths';
import { DogLogoImage } from '@/public/images/logIn';
import { LogOutImage } from '@/public/images/logOut';
import { atomlogInState } from '@/recoil/atoms';
import * as B from '@/styles/base.style';
import { Flex, Position } from '@/styles/layout.style';
import { SideMenuBlackDiv, SideMenuWhiteDiv, SideMenuGrayDiv } from '@/styles/SideMenuUi';
import theme from '@/styles/theme';
import { decodeToken } from '@/utils/logIn';

const PositionBox = styled(Position)`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

export function SideMenu({ show }: CommonStyledComponents.SideMenuProp) {
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const router = useRouter();
  const [height, setHeight] = useState(0);
  const [logIn, setLogIn] = useRecoilState(atomlogInState);
  const logInState = decodeToken(logIn[LOGIN.TOKEN_NAME]);

  const hideSideMenu = () => {
    show.setShowSideMenu(false);
  };

  const handleClickLogOutButton = () => {
    setLogIn(false);
    show.setShowSideMenu(false);
    return router.push('/');
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
            {logInState?.state && (
              <B.ListItem logIn={logInState.state}>
                <PositionBox position="absolute" bottom="1.5rem">
                  <B.ListUl gap="0">
                    {logInState && logInState.role === LOGIN.ROLE_ADMIN && (
                      <B.ListItem fontWeight={theme.font.bold.b} color={theme.colors.deepGray} padding="0 0 0.5rem 0">
                        관리자 페이지
                      </B.ListItem>
                    )}
                    <PositionBox>
                      <Flex width="10rem">
                        <B.Title onClick={() => handleClickLogOutButton()}>
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
