import { Button, Flex } from 'antd';

import styles from './index.module.scss';

type Props = {
  countName: string;
  countNum: number;
  totalCountNum?: number;
  onClick?: () => void;
};

const CountCard = ({ countName, countNum, onClick, totalCountNum }: Props) => (
  <div className={styles.cardWrap}>
    <Button onClick={totalCountNum ? onClick : undefined} className={styles.cardBtn}>
      <Flex vertical justify="space-between" className={styles.textWrap}>
        <Flex justify="space-between" align="center" className={styles.textTitelWrap}>
          <p>{countName}</p>
          {totalCountNum && <p style={{ fontSize: 10 }}>Count / Total</p>}
        </Flex>

        <div>
          {totalCountNum ? (
            <span className={styles.totalSpan}>
              <p className={styles.font_800}>{countNum}</p> / {totalCountNum}
            </span>
          ) : (
            <p className={styles.font_800} style={{ float: 'right' }}>
              {countNum}
            </p>
          )}
        </div>
      </Flex>
    </Button>
  </div>
);

export default CountCard;
