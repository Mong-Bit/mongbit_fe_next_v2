import { Input } from 'antd';
import { valueType } from 'antd/es/statistic/utils';

interface Props {
  placeholder: string;
  maxLength: number;
  value?: valueType;
  style?: React.CSSProperties;
  onChange: () => void;
}

const AntdTextArea: React.FC<Props> = ({ placeholder, maxLength, value, style, onChange }) => (
  <Input value={value} placeholder={placeholder} maxLength={maxLength} allowClear onChange={onChange} style={style} />
);

export default AntdTextArea;
