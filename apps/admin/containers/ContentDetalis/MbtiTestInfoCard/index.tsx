import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Image, Card, Flex, Button } from 'antd';
import cx from 'classnames';

import styles from './index.module.scss';

interface Props {
  title: string;
  type: string;
  imageUrl: string;
  createDate?: string;
  resultsLength: number;
  questionsLength: number;
}

const MbtiInfoCard = ({ title, type, imageUrl, createDate, resultsLength, questionsLength }: Props) => (
  <Flex justify="space-around" align="center" className={cx('back_shadow', styles.cardWrap)}>
    <Flex vertical gap="middle">
      <Image width={200} src={imageUrl} placeholder={<Image preview={false} src={imageUrl} width={200} />} />
      <Flex justify="space-around" align="center">
        <Button danger>
          <DeleteOutlined key="delete" />
        </Button>
        <Button>
          <EditOutlined key="edit" />
        </Button>
      </Flex>
    </Flex>

    <Card title={title} style={{ border: 'none', width: 300 }}>
      <Flex justify="space-between" align="center">
        <p>카테고리</p>
        <p>{type}</p>
      </Flex>
      <Flex justify="space-between" align="center">
        <p>질문 수</p>
        <p>{resultsLength}</p>
      </Flex>
      <Flex justify="space-between" align="center">
        <p>결과 수</p>
        <p>{questionsLength}</p>
      </Flex>
      <Flex justify="space-between" align="center">
        <p>작성 일</p>
        <p>{new Date(createDate!).toLocaleDateString('en-CA')}</p>
      </Flex>
    </Card>
  </Flex>
);

export default MbtiInfoCard;
