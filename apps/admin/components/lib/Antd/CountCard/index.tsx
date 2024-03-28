import { Card } from 'antd';

import styles from './index.module.scss';

type Props = {
  countName: string;
  countNum: number;
  totalCountNum: number;
  onClick: () => void;
};

const CountCard: React.FC<Props> = ({ countName, countNum, onClick, totalCountNum }) => (
  <div className={styles.cardWrao}>
    <Card
      key={countName}
      size="small"
      title={countName}
      extra={<p style={{ fontSize: 10 }}>Count / Total</p>}
      className={styles.card}
      onClick={onClick}
    >
      <p style={{ float: 'right' }}>
        {countNum} / {totalCountNum}
      </p>
    </Card>
  </div>
);

export default CountCard;
