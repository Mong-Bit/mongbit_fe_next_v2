'use client';

import Image from 'next/image';
import Link from 'next/link';

import { CLIENT_DOMAIN } from '@/constants/domain';
import setKakaoLogin from '@/services/kakaoLogin';

import styles from './index.module.scss';

export default function KakaoLogin() {
  return (
    <div className={styles.wrap}>
      <div className={styles.contentsWrap}>
        <div className={styles.text}>
          <Link href={CLIENT_DOMAIN}>몽빗 이동하기</Link>
        </div>
        <div className={styles.logoimg}>
          <p>© 2023 MongMoongCrew. All rights reserved </p>
        </div>
        <button onClick={() => setKakaoLogin()}>
          <Image alt="Kakao Login Button" width={300} height={45} src="/images/kakaoLogInBtn.png" />
        </button>
      </div>
    </div>
  );
}
