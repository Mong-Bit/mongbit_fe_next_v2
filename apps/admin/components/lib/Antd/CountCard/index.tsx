import { Card } from 'antd';

import styles from './index.module.scss';

type Props = {
  countName: string;
  countNum: number;
  totalCountNum?: number;
  hover: boolean;
  onClick?: () => void;
};

const CountCard = ({ countName, countNum, onClick, hover, totalCountNum }: Props) => (
  <Card
    onClick={totalCountNum ? onClick : undefined}
    hoverable={hover}
    type="inner"
    size="small"
    title={countName}
    extra={totalCountNum && <p style={{ fontSize: 10 }}>Count / Total</p>}
    style={{ width: 150 }}
  >
    {totalCountNum ? (
      <span className={styles.totalSpan}>
        <p className={styles.font_800}>{countNum}</p> / {totalCountNum}
      </span>
    ) : (
      <p className={styles.font_800} style={{ float: 'right' }}>
        {countNum}
      </p>
    )}
  </Card>
);

export default CountCard;
