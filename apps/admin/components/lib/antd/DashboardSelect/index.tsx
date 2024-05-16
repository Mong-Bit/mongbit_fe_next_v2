import { Select } from 'antd';

import { SelectOptionType } from '@/types/options';

type Props = {
  handleChange: (value: string) => void;
  defaultValue: SelectOptionType[];
};

const DashboardSelect = ({ handleChange, defaultValue }: Props) => (
  <Select
    defaultValue={defaultValue[0].value}
    style={{ width: 100, margin: '0 10px' }}
    onChange={handleChange}
    size="small"
    options={defaultValue}
  />
);
export default DashboardSelect;
