import { Card, Flex } from 'antd';
import { useEffect, useState } from 'react';

import { COUNT_OPTIONS } from '@/constants/constant';
import useAsyncAction from '@/hooks/useAsyncAction';
import { useCounts } from '@/hooks/useCounts';
import { localeDate } from '@/utils/dateTime';

import CountChart from '../CountChart';
import CountCard from '@/components/lib/antd/CountCard';
import RadioRangePickerBox from '@/components/lib/antd/CountRangePicker';

const CountCardBox = () => {
  const { getTotalCountsData, totalCountsData } = useCounts();
  const [selectOptions, setSelectOptions] = useState(COUNT_OPTIONS[0]);

  const [isLoading, executeGetTotalCounts] = useAsyncAction(getTotalCountsData, {
    startDate: localeDate,
    endDate: localeDate,
  });

  const handleDateInquiryButton = (date: [string, string]) =>
    getTotalCountsData({ startDate: date[0], endDate: date[1] });

  useEffect(() => {
    executeGetTotalCounts();
  }, []);

  return (
    <Card loading={isLoading}>
      <RadioRangePickerBox handleDateInquiryButton={handleDateInquiryButton} />
      <Flex justify="center" align="center">
        <Flex wrap="wrap" gap="middle" justify="center" style={{ maxWidth: 350, marginRight: 20 }}>
          {totalCountsData?.map((count, i) => (
            <CountCard
              key={count.name}
              countName={count.name}
              countNum={count.count}
              totalCountNum={count.totalCount}
              hover={true}
              onClick={() => setSelectOptions(COUNT_OPTIONS[i])}
            />
          ))}
        </Flex>
        <CountChart selectOptions={selectOptions} />
      </Flex>
    </Card>
  );
};

export default CountCardBox;
