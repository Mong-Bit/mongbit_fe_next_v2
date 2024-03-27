'use client';

import cx from 'classnames';
import { useEffect } from 'react';

import { COUNT_OPTIONS } from '@/constants/constant';
import { useContents } from '@/hooks/useContents';
import { LatestMbti } from '@/types/test';

import styles from './index.module.scss';

const LatestContentCard: React.FC = () => {
  const { getLatestContent, latestContent } = useContents();

  useEffect(() => {
    getLatestContent(0, 1);
  }, []);

  return (
    <div className={cx(styles.latestContentCard, 'contentCard', 'back_shadow')}>
      <h2>Latest Contents Insight</h2>
      <div className={cx(styles.latestContentTitle, 'border_g')}>
        <p>{latestContent?.title}</p>
        <div className={styles.latestDate}>
          <p>{latestContent?.type}</p>
          <p>{latestContent && latestContent.createDate && new Date(latestContent.createDate).toLocaleDateString()}</p>
        </div>
      </div>
      <ul className={styles.latestContentUl}>
        {COUNT_OPTIONS.map((option) => (
          <li key={option[1]}>
            <p>{option[1]}</p>
            <p>{latestContent && latestContent[option[0] as keyof LatestMbti]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestContentCard;
