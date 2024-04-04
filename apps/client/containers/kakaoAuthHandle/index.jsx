'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getHeaders, goPageWithSelector } from '@/utils/util';
import { LOGIN } from '@/constants/constant';
import { fetchClient } from '@/services';
import { atomlogInState, selectorLogInState } from '@/recoil/atoms.ts';
import { useAnimationEffect } from '@/hooks/hooks';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import loadingAnimationData from './anim_loading.json';

export default function KakaoAuthHandle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef(null);
  const code = searchParams.get('code');

  const [logInAtom, setLogInAtom] = useRecoilState(atomlogInState);
  const logInSelector = useRecoilValue(selectorLogInState);

  const updateLogInState = (response) => {
    setLogInAtom({
      ...atomlogInState,
      goPage: {
        url: logInSelector.goPage ? logInSelector.goPage : '/',
      },
      [LOGIN.TOKEN_NAME]: response.headers.get('Authorization'),
      [LOGIN.USER_MEMBER_ID]: response.dataList.memberId,
      [LOGIN.USER_THUMBNAIL]: response.dataList.thumbnail,
      [LOGIN.USER_REGISTER_DATE]: response.dataList.registDate,
      [LOGIN.USER_USER_NAME]: response.dataList.username,
    });
  };

  const goMainPage = () => {
    goPageWithSelector(logInSelector, router);
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

        // 로그인 전 headers -> 토큰 값 없음, 로그인 후 -> headers -> 토큰 값 있음
        // 그러므로 getHeaders 함수를 한번 더 호출해준다.
        // headers = getHeaders();
        // 어드민
        // 로그인 트랙킹 api 호출
        // if (!decodeToken().role || decodeToken().role === 'ROLE_USER') {
        //   apiBe.post(`/api/v1/loginTracker/${response.data.memberId}/track`, {}, { headers });
        // }
      });
    }
  }, []);

  useEffect(() => {
    if (logInAtom.goPage) goMainPage();
  }, [logInAtom.goPage]);

  return (
    <Wrap_mediaquery justifyContent="center" position="relative">
      {/* <Div_animation ref={containerRef} width="100px" margin="10rem 10rem"></Div_animation> */}
    </Wrap_mediaquery>
  );
}
