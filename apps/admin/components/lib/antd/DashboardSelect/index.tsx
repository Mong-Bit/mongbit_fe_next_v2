import { Select } from 'antd';

import { OptionType } from '@/types/options';

type Props = {
  handleChange: (value: string) => void;
  defaultValue: OptionType[];
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
