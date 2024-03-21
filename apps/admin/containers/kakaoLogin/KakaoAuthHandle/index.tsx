'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import { DOMAIN_BE_PROD } from '@/constants/domain';
import { AUTHORIZATION, TOKEN_NAME } from '@/constants/constant';

import styles from './index.module.scss';

import { decodeToken, getHeaders } from '@/utils/utils';
import { isLoginState, userState } from '@/states/userState';
import { KakaoLoigin } from '@/types/login';
import SessionStorage from '@/utils/sessionStorage';

export default function KaKaoAuthHandle() {
  const router = useRouter();
  const setUserInfo = useSetRecoilState<KakaoLoigin>(userState);
  const setIsLogin = useSetRecoilState(isLoginState);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    let headers = getHeaders();

    if (code) {
      axios.get(`${DOMAIN_BE_PROD}/login/oauth2/kakao/code?code=${code}`, { headers }).then((response) => {
        SessionStorage.setItem(TOKEN_NAME, response.headers[AUTHORIZATION]);
        setUserInfo((prev) => ({
          ...prev,
          memberId: response.data.memberId,
          username: response.data.username,
          thumbnail: response.data.thumbnail,
          registDate: response.data.registDate,
        }));
        setIsLogin(decodeToken().state);
        headers = getHeaders();

        if (!decodeToken().role || decodeToken().role === 'ROLE_USER') {
          axios
            .post(`${DOMAIN_BE_PROD}/v1/loginTracker/${response.data.memberId}/track`, {}, { headers })
            .catch((err) => {
              alert(err.response.data);
              router.replace('/login');
            });
        }
        router.replace('/login');
      });
    }
  }, []);

  return (
    <main className={styles.wrap}>
      <div className={styles.content}></div>
    </main>
  );
}
