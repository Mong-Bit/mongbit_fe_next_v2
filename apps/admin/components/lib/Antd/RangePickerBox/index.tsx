'use client';

import { Button, DatePicker } from 'antd';
import cx from 'classnames';
import { useState } from 'react';

import DashboardSelect from '../DashboardSelect';

const RangePickerBox: React.FC = () => {
  const { RangePicker } = DatePicker;
  const [test2, setTest2] = useState('');

  console.log(RangePicker)

  return (
    <div style={{ width: 430 }} className={cx('dateSearchWrap', 'border_g')}>
      <RangePicker size="small" />
      <DashboardSelect setTest={setTest2} />
      <Button size="small">조회</Button>
    </div>
  );
};

export default RangePickerBox;
