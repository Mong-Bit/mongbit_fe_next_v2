import { Select } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { OptionType } from '@/types/options';

type Props = {
  setSelectOptions: Dispatch<SetStateAction<string>>;
  defaultValue: OptionType[];
};

const DashboardSelect = ({ setSelectOptions, defaultValue }: Props) => {
  const handleChange = (value: string) => {
    setSelectOptions(value);
  };

  return (
    <Select
      defaultValue={defaultValue[0].value}
      style={{ width: 100, margin: '0 10px' }}
      onChange={handleChange}
      size="small"
      options={defaultValue}
    />
  );
};

export default DashboardSelect;
