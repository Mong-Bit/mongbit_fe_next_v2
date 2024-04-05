'use client';

import CountCardBox from './CountCardBox';
import styles from './index.module.scss';
import LatestContentCard from './LatestContentCard';
import TopContentCard from './TopContentsCard';

export default function Dashboard() {
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
