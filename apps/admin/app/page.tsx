'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PATHS } from '@/constants/paths';
import { decodeToken_csr } from '@/utils/utils';

import KakaoLogin from '@/containers/KakaoLogin';

export default function Page() {
  const token = decodeToken_csr();
  const router = useRouter();

  useEffect(() => {
    if (token.state) {
      router.replace(PATHS.dashboard);
    }
  }, [token]);

  return <KakaoLogin />;
}
