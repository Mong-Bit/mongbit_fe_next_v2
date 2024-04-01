import { Select } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { getSelectOptions } from '@/utils/getSelectOptions';

type Props = {
  setSelectOptions:Dispatch<SetStateAction<string>>;
  defaultValue: string[][];
}

const DashboardSelect: React.FC<Props> = ({ setSelectOptions,defaultValue }) => {
  const handleChange = (value: string) => {
    setSelectOptions(value);
  };

  return (
    <Select
      defaultValue={defaultValue[0][0]}
      style={{ width: 100, margin: '0 10px' }}
      onChange={handleChange}
      size="small"
      options={defaultValue.map((count) => getSelectOptions(count[0], count[1]))}
    />
  );
};

export default DashboardSelect;
