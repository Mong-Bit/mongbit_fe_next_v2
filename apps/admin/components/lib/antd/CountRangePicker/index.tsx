import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { DATE_FORMAT } from '@/constants/constant';
import { localeDate } from '@/utils/dateTime';

interface Props {
  handleDateInquiryButton: (date: [string, string]) => void;
}

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

const RadioRangePickerBox = ({ handleDateInquiryButton }: Props) => {
  const onChange = (dateString: [string, string]) => {
    handleDateInquiryButton(dateString);
  };

  return (
    <RangePicker
      defaultValue={[dayjs(localeDate, DATE_FORMAT), dayjs(localeDate, DATE_FORMAT)]}
      format={DATE_FORMAT}
      showNow
      minDate={dayjs('2023-06-27', DATE_FORMAT)}
      maxDate={dayjs(localeDate, DATE_FORMAT)}
      onChange={(_, date) => onChange(date)}
      style={{ marginBottom: 20 }}
    />
  );
};
export default RadioRangePickerBox;
