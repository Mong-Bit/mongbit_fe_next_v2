'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { LOGIN } from '@/constants/constant';
import { useAnimationEffect } from '@/hooks/hooks';
import loadingAnimationData from '@/public/animation/loading.json';
import { atomloginState } from '@/recoil/atoms';
import { fetchClient } from '@/services';
import * as B from '@/styles/base.style';
import * as L from '@/styles/layout.style';
import { getHeaders, goPageWithSelector } from '@/utils/common';

export default function KakaoAuthHandle() {
  const router = useRouter();
  const containerRef = useRef(null);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [loginAtom, setLogInAtom] = useRecoilState(atomloginState);

  const updateLogInState = (response: Containers.UpdateLogInStateProp) => {
    setLogInAtom({
      ...atomloginState,
      goPage: {
        url: loginAtom.goPage ? loginAtom.goPage : '/',
      },
      [LOGIN.TOKEN_NAME]: response?.headers?.get('Authorization'),
      [LOGIN.USER_MEMBER_ID]: response?.dataList.memberId,
      [LOGIN.USER_THUMBNAIL]: response?.dataList.thumbnail,
      [LOGIN.USER_REGISTER_DATE]: response?.dataList.registDate,
      [LOGIN.USER_NAME]: response?.dataList.username,
    });
  };

  const goMainPage = () => {
    goPageWithSelector(loginAtom, router);
    clearGoPageState();
  };

  const clearGoPageState = () => {
    setLogInAtom({
      ...loginAtom,
      goPage: false,
    });
  };

  // hooks
  useAnimationEffect(containerRef, loadingAnimationData);

  useEffect(() => {
    const headers = getHeaders();

    if (code) {
      fetchClient({
        url: `/login/oauth2/kakao/code?code=${code}`,
        method: 'GET',
        headers,
      }).then((response) => {
        updateLogInState(response);
      });
    }
  }, []);

  useEffect(() => {
    if (loginAtom.goPage) goMainPage();
  }, [loginAtom.goPage]);

  return (
    <B.Wrap_mediaquery $justifyContent="center" position="relative">
      <L.AnimationDiv ref={containerRef} />
    </B.Wrap_mediaquery>
  );
}
