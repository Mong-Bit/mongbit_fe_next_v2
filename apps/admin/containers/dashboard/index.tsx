'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Paths } from '@/constants/paths';
import { decodeToken } from '@/utils/utils';

import CountCardBox from './CountCardBox';
import styles from './index.module.scss';
import LatestContentCard from './LatestContentCard';
import TopContentCard from './TopContentsCard';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!decodeToken().state) router.push(Paths.login);
  }, []);

  return (
    <div className={styles.wrap}>
      <CountCardBox />
      <div className={styles.bottonWrap}>
        <LatestContentCard />
        <TopContentCard />
      </div>
    </div>
  );
}
