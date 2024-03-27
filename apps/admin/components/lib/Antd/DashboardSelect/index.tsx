import { Select } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { COUNT_OPTIONS } from '@/constants/constant';
import { getSelectOptions } from '@/utils/getSelectOptions';

const DashboardSelect: React.FC<{ setTest: Dispatch<SetStateAction<string>> }> = ({ setTest }) => {
  const handleChange = (value: string) => {
    setTest(value);
    console.log(`selected ${value}`);
  };

  return (
    <Select
      defaultValue={COUNT_OPTIONS[0][0]}
      style={{ width: 100, margin: '0 10px' }}
      onChange={handleChange}
      size="small"
      options={COUNT_OPTIONS.map((count) => getSelectOptions(count[0], count[1]))}
    />
  );
};

export default DashboardSelect;
