'use client';

import { PaperClipOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Spin, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import { PATHS } from '@/constants/paths';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useSaveMbti } from '@/hooks/useSaveMbti';
import { mbtiImageState, mbtiTestDataState } from '@/states/contentUpdateState';

import TableColumns from '@/containers/MbtiTestForm/MbtiPreview/MbtiPrevTableColumns';

interface Props {
  onPrev: () => void;
}

export default function MbtiPreview({ onPrev }: Props) {
  const { handleImageUpload, loading } = useSaveMbti();
  const { deleteImageFileArray } = useImageUpload();
  const testData = useRecoilValue(mbtiTestDataState);
  const imageUploads = useRecoilValue(mbtiImageState);

  const TableColumn = TableColumns();
  const router = useRouter();

  const onClickSaveBtn = async () => {
    try {
      await handleImageUpload();
      deleteImageFileArray();
      router.push(PATHS.contentsRegisterSuccess);
    } catch (error) {
      alert(`error : ${error}`);
    }
  };

  return (
    <Flex vertical align="center" justify="space-between" gap={30} style={{ margin: '50px 0' }}>
      <h2>Preview</h2>
      <Flex vertical justify="center" align="center" gap={40}>
        <Card title={testData.title} extra={<p>MBTI</p>} style={{ width: 600 }}>
          <Flex vertical justify="center" align="center">
            <p style={{ marginBottom: 25 }}>{testData.content}</p>
            {imageUploads[0]?.name && (
              <Space style={{ width: '100%' }}>
                <PaperClipOutlined />
                {imageUploads[0].name}
              </Space>
            )}
          </Flex>
        </Card>
        <Table
          style={{ width: 800 }}
          columns={TableColumn.questionsColumns}
          dataSource={testData.questions}
          rowKey="index"
          bordered
          pagination={false}
          title={() => 'Questions'}
        />
        <Table
          style={{ width: 800 }}
          columns={TableColumn.resultsColumns}
          dataSource={testData.results}
          bordered
          rowKey="result"
          pagination={false}
          title={() => 'Results'}
        />
      </Flex>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Flex justify="space-between" style={{ margin: 'auto', width: 180 }}>
          <Button onClick={onPrev}>이전</Button>
          <Button type="primary" onClick={onClickSaveBtn}>
            저장
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
