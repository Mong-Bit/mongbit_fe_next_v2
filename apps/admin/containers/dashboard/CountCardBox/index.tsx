import cx from 'classnames';

import styles from './index.module.scss';
import CountCard from '@/components/lib/Antd/CountCard';
import RadioRangePickerBox from '@/components/lib/Antd/RadioRangePickerBox';

const CountCardBox: React.FC = () => {
  const totalCount = [
    { name: 'Visit', count: 100 },
    { name: 'Play', count: 110 },
    { name: 'Login', count: 132 },
    { name: 'Share', count: 113 },
    { name: 'Link Copie', count: 104 },
    { name: 'Like', count: 98 },
    { name: 'Comment', count: 60 },
  ];

  return (
    <div className={cx('contentCard', 'back_shadow')}>
      <RadioRangePickerBox />
      <div className={styles.countCardsWrap}>
        {totalCount.map((count) => (
          <CountCard key={count.name} countName={count.name} countNum={count.count} />
        ))}
      </div>
    </div>
  );
};

export default CountCardBox;
