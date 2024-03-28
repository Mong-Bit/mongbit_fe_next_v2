import cx from 'classnames';
import { useEffect, useState } from 'react';

import { COUNT_OPTIONS } from '@/constants/constant';
import { useCounts } from '@/hooks/useCounts';
import { localeDate } from '@/utils/dateTime';

import styles from './index.module.scss';
import ComparisonChartCard from '../ComparisonChart';
import CountCard from '@/components/lib/Antd/CountCard';
import RadioRangePickerBox from '@/components/lib/Antd/CountRangePicker';

const CountCardBox: React.FC = () => {
  const { getTotalCountsData, totalCountsData } = useCounts();
  const [selectOptions, setSelectOptions] = useState(COUNT_OPTIONS[0][0]);

  useEffect(() => {
    getTotalCountsData(localeDate, localeDate);
  }, []);

  const handleDateInquiryButton = (date: [string, string]) => getTotalCountsData(date[0], date[1]);

  return (
    <div className={cx('contentCard', 'back_shadow')}>
      <RadioRangePickerBox handleDateInquiryButton={handleDateInquiryButton} />
      <div className={styles.contents}>
        <div className={styles.countCardsWrap}>
          {totalCountsData?.map((count, i) => (
            <CountCard
              key={count.name}
              countName={count.name}
              countNum={count.count}
              totalCountNum={count.totalCount}
              onClick={() => setSelectOptions(COUNT_OPTIONS[i][0])}
            />
          ))}
        </div>
        <ComparisonChartCard selectOptions={selectOptions} />
      </div>
    </div>
  );
};

export default CountCardBox;
