import { Button, DatePicker, Radio, RadioChangeEvent } from 'antd';
import cx from 'classnames';
import { useState } from 'react';

const RadioRangePickerBox: React.FC = () => {
  const [value, setValue] = useState(2);
  const { RangePicker } = DatePicker;

  console.log(RangePicker);

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div style={{ width: 490 }} className={cx('dateSearchWrap', 'border_g')}>
      <RangePicker size="small" style={{ width: 200 }} />
      <div style={{ marginLeft: 10 }}>
        <Radio.Group onChange={onChangeRadio} value={value}>
          <Radio value={1}>기간별 조회</Radio>
          <Radio value={2}>전체 조회</Radio>
        </Radio.Group>
      </div>
      <Button size="small">조회</Button>
    </div>
  );
};
export default RadioRangePickerBox;
