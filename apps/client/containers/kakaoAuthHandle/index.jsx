'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';

import { getHeaders, goPageWithSelector } from '@/utils/util';
import { LOGIN } from '@/constants/constant';
import { fetchClient } from '@/services';
import { atomlogInState } from '@/recoil/atoms.ts';
import { useAnimationEffect } from '@/hooks/hooks';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { Wrap } from '@/components/ui/CommonElements';
import loadingAnimationData from './anim_loading.json';

export default function KakaoAuthHandle() {
  const router = useRouter();
  const containerRef = useRef(null);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [logInAtom, setLogInAtom] = useRecoilState(atomlogInState);

  const updateLogInState = (response) => {
    setLogInAtom({
      ...atomlogInState,
      goPage: {
        url: logInAtom.goPage ? logInAtom.goPage : '/',
      },
      [LOGIN.TOKEN_NAME]: response.headers.get('Authorization'),
      [LOGIN.USER_MEMBER_ID]: response.dataList.memberId,
      [LOGIN.USER_THUMBNAIL]: response.dataList.thumbnail,
      [LOGIN.USER_REGISTER_DATE]: response.dataList.registDate,
      [LOGIN.USER_USER_NAME]: response.dataList.username,
    });
  };

  const goMainPage = () => {
    goPageWithSelector(logInAtom, router);
    clearGoPageState(setLogInAtom, logInAtom);
  };

  const clearGoPageState = () => {
    setLogInAtom({
      ...logInAtom,
      goPage: false,
    });
  };

  // hooks
  useAnimationEffect(containerRef, loadingAnimationData);

  useEffect(() => {
    let headers = getHeaders();

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
    if (logInAtom.goPage) goMainPage();
  }, [logInAtom.goPage]);

  return (
    <Wrap_mediaquery justifyContent="center" position="relative">
      <Wrap ref={containerRef} width="100px" margin="10rem 10rem" />
    </Wrap_mediaquery>
  );
}
