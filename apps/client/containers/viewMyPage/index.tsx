'use client';

import { useRecoilValue } from 'recoil';

import { LOGIN } from '@/constants/constant';
import { decodeToken } from '@/utils/logIn';

import { TitleAndText } from '@/components/base/MbtiTestContent';
import { MyPageUserInfoBox } from '@/components/ui/MyPage';
import { Wrap_mediaquery } from '@/components/ui/Wrap';

import { atomlogInState } from '@/recoil/atoms';

export default function ViewMyPage() {
  const user = useRecoilValue(atomlogInState);
  const logInState = decodeToken(user[LOGIN.TOKEN_NAME]);

  const mypageTitle = {
    titleText: `🦁 ${user[LOGIN.USER_NAME]}님의 마이페이지`,
  };
  const resultTitle = {
    titleText: '🐭 최근 테스트 결과',
  };

  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      padding="0 1.5rem 0 1.5rem"
    >
      <TitleAndText text={mypageTitle} />
      <MyPageUserInfoBox
        name={user[LOGIN.USER_NAME]}
        thumbnail={user[LOGIN.USER_THUMBNAIL]}
        registerDate={user[LOGIN.USER_REGISTER_DATE]}
        role={logInState?.role}
      />
      <TitleAndText text={resultTitle} />
    </Wrap_mediaquery>
  );
}
