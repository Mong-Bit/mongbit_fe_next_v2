import { Button, DatePicker, Radio, RadioChangeEvent } from 'antd';
import cx from 'classnames';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';

import { DATE_FORMAT } from '@/constants/dateFormat';
import { localeDate } from '@/utils/dateTime';

interface Porops {
  handleDateInquiryButton: (date: [string, string]) => void;
}

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

const RadioRangePickerBox: React.FC<Porops> = ({ handleDateInquiryButton }) => {
  const [radioValue, setRadioValue] = useState(2);
  const [date, setDate] = useState<[string, string] | undefined>();

  const onChange = (dateString: [string, string]) => {
    handleDateInquiryButton(dateString);
    setDate(dateString);
    setRadioValue(1);
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const onClickBtn = () => {
    if (date && radioValue === 1) handleDateInquiryButton(date);
    else handleDateInquiryButton([localeDate, localeDate]);
  };

  return (
    <div style={{ width: 500 }} className={cx('dateSearchWrap', 'border_g')}>
      <RangePicker
        size="small"
        defaultValue={[dayjs(localeDate, DATE_FORMAT), dayjs(localeDate, DATE_FORMAT)]}
        format="YYYY-MM-DD"
        minDate={dayjs('2023-06-27', DATE_FORMAT)}
        maxDate={dayjs(localeDate, DATE_FORMAT)}
        onChange={(_, date) => onChange(date)}
      />
      <div style={{ marginLeft: 10 }}>
        <Radio.Group onChange={onChangeRadio} value={radioValue}>
          <Radio value={1}>기간별 조회</Radio>
          <Radio value={2}>Today</Radio>
        </Radio.Group>
      </div>
      <Button size="small" onClick={onClickBtn}>
        조회
      </Button>
    </div>
  );
};
export default RadioRangePickerBox;
