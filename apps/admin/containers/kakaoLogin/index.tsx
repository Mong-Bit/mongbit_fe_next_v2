'use client';

import { kakaoLoginBtn } from '@mongbit/ui/image';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { CLIENT_DOMAIN } from '@/constants/domain';
import { Paths } from '@/constants/paths';
import setKakaoLogin from '@/services/kakaoLogin';
import { decodeToken } from '@/utils/utils';

import styles from './index.module.scss';

export default function KakaoLogin() {
  const router = useRouter();

  useEffect(() => {
    if (decodeToken().state) router.push(Paths.home);
  }, []);

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
          <Image alt="Kakao Login Button" width={400} src={kakaoLoginBtn} />
        </button>
      </div>
    </div>
  );
}
