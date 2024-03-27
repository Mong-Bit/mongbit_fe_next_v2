'use client';

import { PaperClipOutlined } from '@ant-design/icons';
import { Button, Card, Space, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Paths } from '@/constants/paths';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useSaveMbti } from '@/hooks/useSaveMbti';

import styles from './index.module.scss';
import { SaveButton } from '@/components/common/Buttons';

import TableColumns from '@/containers/MbtiTestForm/MbtiPreview/MbtiPrevTableColumns';
import { mbtiImageState, mbtiTestDataState } from '@/states/testUpdateDataState';

interface Props {
  onPrev: () => void;
}

export default function MbtiPreview({ onPrev }: Props) {
  const { handleImageUpload, loading } = useSaveMbti();
  const { deleteImageFileArray } = useImageUpload();
  const [testData, setTestData] = useRecoilState(mbtiTestDataState);
  const imageUploads = useRecoilValue(mbtiImageState);

  const TableCilumn = TableColumns();

  const router = useRouter();

  useEffect(() => {
    setTestData({
      ...testData,
      createDate: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString(),
    });
  }, []);

  const onClickSaveBtn = async () => {
    try {
      await handleImageUpload();
      deleteImageFileArray();
      router.push(Paths.contentsRegisterSuccess);
    } catch (error) {
      alert(`error : ${error}`);
    }
  };

  return (
    <div className={styles.wrap}>
      <h2 className="title_a">Preview</h2>
      <div className={styles.formWrap}>
        <Space direction="vertical" className={styles.infoCardWrap}>
          <Card title={testData.title} extra={<p>MBTI</p>} style={{ width: 650 }}>
            <div className={styles.infoWrap}>
              <p style={{ marginBottom: 25 }}>{testData.content}</p>
              <p>
                <PaperClipOutlined />
                {imageUploads[0]?.name}
              </p>
            </div>
          </Card>
        </Space>
        <Table
          className={styles.tableWrap}
          columns={TableCilumn.questionsColumns}
          dataSource={testData.questions}
          rowKey={testData.id}
          bordered
          pagination={false}
          title={() => 'Questions'}
        />
        <Table
          className={styles.tableWrap}
          columns={TableCilumn.resultsColumns}
          dataSource={testData.results}
          bordered
          rowKey={testData.id}
          pagination={false}
          title={() => 'Results'}
        />
      </div>
      {loading ? (
        <p>업데이트 중..(로딩화면 만들게요..기다려주세요)</p>
      ) : (
        <div className={'button_box'}>
          <Button onClick={onPrev}>이전</Button>
          <SaveButton onClick={onClickSaveBtn} />
        </div>
      )}
    </div>
  );
}
