import { Select } from 'antd';

import { SelectOptionType } from '@/types/options';

type Props = {
  onChange: (value: string) => void;
  defaultValue: SelectOptionType[];
};

const DashboardSelect = ({ onChange, defaultValue }: Props) => (
  <Select
    defaultValue={defaultValue[0].value}
    style={{ width: 100, margin: '0 10px' }}
    onChange={onChange}
    size="small"
    options={defaultValue}
  />
);
export default DashboardSelect;
