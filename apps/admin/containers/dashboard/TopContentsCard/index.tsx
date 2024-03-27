'use client';

import cx from 'classnames';
import { useState } from 'react';

import styles from './index.module.scss';
import DashboardSelect from '@/components/lib/Antd/DashboardSelect';

const TopContentsCard: React.FC = () => {
  const [test1, setTest1] = useState('');

  return (
    <div className={cx('contentCard', styles.topContentsCard, 'back_shadow')}>
      <div className={styles.topContentTitle}>
        <h2>Top Contents</h2>
        <DashboardSelect setTest={setTest1} />
      </div>
      <ul>
        <li>
          <p>test 1</p>
          <span>1,000</span>
        </li>
        <li>
          <p>test 2</p>
          <span>1,000</span>
        </li>
        <li>
          <p>test 3</p>
          <span>1,000</span>
        </li>
        <li>
          <p>test 4</p>
          <span>1,000</span>
        </li>
        <li>
          <p>test 5</p>
          <span>1,000</span>
        </li>
      </ul>
    </div>
  );
};

export default TopContentsCard;
