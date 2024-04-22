import { Card, Flex } from 'antd';

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
    <Flex justify="flex-end" gap="small">
      {totalCountNum ? (
        <>
          <p style={{ fontWeight: 800 }}>{countNum}</p>
          <p>/ {totalCountNum}</p>
        </>
      ) : (
        <p style={{ fontWeight: 800 }}>{countNum}</p>
      )}
    </Flex>
  </Card>
);

export default CountCard;
