import { Card } from 'antd';

type Props = {
  countName: string;
  countNum: number;
};

const CountCard: React.FC<Props> = ({ countName, countNum }) => (
  <Card
    key={countName}
    size="small"
    title={countName}
    extra={<p style={{ fontSize: 10 }}>Today / Total</p>}
    style={{ width: 180, height: 80 }}
  >
    <p style={{ float: 'right' }}>{countNum} / 1,000</p>
  </Card>
);

export default CountCard;
