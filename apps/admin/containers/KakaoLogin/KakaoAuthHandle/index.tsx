'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { AUTHORIZATION, ROLE_ADMIN, TOKEN_NAME } from '@/constants/constant';
import { DOMAIN_BE_PROD } from '@/constants/domain';
import { PATHS } from '@/constants/paths';
import { userState } from '@/states/userState';
import { DecodedToken, KakaoLogin } from '@/types/login';
import { setCookie } from '@/utils/cookies';
import { decodeToken, getHeaders } from '@/utils/utils';

import styles from './index.module.scss';

export default function KaKaoAuthHandle() {
  const setUserInfo = useSetRecoilState<KakaoLogin>(userState);
  const router = useRouter();
  const code = useSearchParams().get('code');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!code) return;

        const headers = getHeaders();
        const response = await axios.get(`${DOMAIN_BE_PROD}/login/oauth2/kakao/code?code=${code}`, { headers });

        const token = response.headers[AUTHORIZATION].replace('Bearer ', '');
        const decodedToken: DecodedToken = decodeToken(token);

        const { memberId, username, thumbnail, registDate } = response.data;

        if (decodedToken.role !== ROLE_ADMIN) {
          alert('접근 권한이 없습니다. 로그인페이지로 이동합니다.');
          router.replace(PATHS.login);
          return;
        }

        setCookie(TOKEN_NAME, token, {
          path: '/',
          secure: true,
          expires: decodedToken.expires,
        });

        setUserInfo({
          memberId,
          username,
          thumbnail,
          registDate,
        });

        router.replace(PATHS.dashboard);
      } catch (error) {
        alert(`error: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.wrap}>
      <div className={styles.content} />
    </main>
  );
}
