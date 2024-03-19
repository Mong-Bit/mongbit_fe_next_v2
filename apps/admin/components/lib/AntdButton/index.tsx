import { Button } from 'antd';

interface Porps {
  btnName: string;
  style?: React.CSSProperties;
  disabled: boolean;
  onClick: () => void;
}

const AntdButton: React.FC<Porps> = ({ btnName, style, disabled, onClick }) => (
  <Button style={style} disabled={disabled} onClick={onClick}>
    {btnName}
  </Button>
);

export default AntdButton;
