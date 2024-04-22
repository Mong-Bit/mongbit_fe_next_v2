import { Image, Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';

import { PATHS } from '@/constants/paths';

import { DeleteButton, EditButton } from '@/components/lib/antd_dev/ContentButtons';

interface Props {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  createDate?: string;
  resultsLength: number;
  questionsLength: number;
}

const MbtiInfoCard = ({ id, title, type, imageUrl, createDate, resultsLength, questionsLength }: Props) => {
  const router = useRouter();

  const handleDeleteBtn = () => {
    router.push(PATHS.contents);
  };

  return (
    <Card style={{ maxWidth: 550, height: 220 }} size="small">
      <Flex justify="space-around" align="center">
        <Flex vertical gap="middle">
          <Image
            width={150}
            height={120}
            src={imageUrl}
            style={{ objectFit: 'cover' }}
            placeholder={<Image preview={false} src={imageUrl} width={200} />}
          />
          <Flex justify="space-around" align="center">
            <DeleteButton testId={id} handleDeleteBtn={handleDeleteBtn} />
            <EditButton testId={id} />
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
    </Card>
  );
};

export default MbtiInfoCard;
