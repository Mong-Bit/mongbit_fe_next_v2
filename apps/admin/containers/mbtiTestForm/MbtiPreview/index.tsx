'use client';

import { Button, Card, Space, Table, TableProps, Upload } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { UploadOutlined, PlusOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import { useAddMbti } from '@/hooks/useAddMbti';

import styles from './index.module.scss';
import { PrevButton, SaveButton } from '@/components/common/Buttons';

import { testInfoState } from '@/states/testInfoState';
import { mbtiImageState } from '@/states/testImageState';
import { mbtiTestDataState } from '@/states/testDataState';
import { MbtiQuestions, MbtiResults } from '@/types/test';

export default function MbtiPreview() {
  const { postImageUplod, loading } = useAddMbti();
  const testInfo = useRecoilValue(testInfoState);
  const [testData, setTestData] = useRecoilState(mbtiTestDataState);
  const [imageUploads, setImageUploads] = useRecoilState(mbtiImageState);

  const [isDisabled, setIsDisabled] = useState(false);

  const questionNames = ['E / I', 'N / S', 'F / T', 'J / P'];

  const isAllDataValid = useMemo(() => {
    const isAllImagesUploaded = imageUploads.every((image) => image !== undefined);
    return isAllImagesUploaded;
  }, [imageUploads]);

  useEffect(() => {
    setTestData({
      ...testData,
      title: testInfo.title,
      content: testInfo.content,
    });
  }, [testInfo]);

  useEffect(() => {
    if (isAllDataValid) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isAllDataValid]);

  const uploadImage = (index: number, info: UploadChangeParam<UploadFile>) => {
    const { file } = info;
    if (file && file.originFileObj instanceof Blob) {
      setImageUploads((prevUploads: File[]) =>
        prevUploads.map((upload, idx) => (idx === index ? (file.originFileObj as File) : upload)),
      );
    }
  };

  const onClick = () => {
    postImageUplod();
  };

  const questionsColumns: TableProps<MbtiQuestions>['columns'] = [
    {
      title: 'Index',
      dataIndex: 'index',
      width: 150,
      render: (text, _, i) => (
        <p>
          [ {questionNames[Math.floor(i / 3)]} ] 질문 {text}
        </p>
      ),
    },
    {
      title: 'Question',
      dataIndex: 'question',
    },
    {
      title: 'AnswerPlus',
      dataIndex: 'answerPlus',
    },
    {
      title: 'AnswerMinus',
      dataIndex: 'answerMinus',
    },
  ];

  const resultsColumns: TableProps<MbtiResults>['columns'] = [
    {
      title: 'Result',
      dataIndex: 'result',
      width: 150,
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
    },
    {
      title: 'Image URL',
      dataIndex: 'imageUrl',
      width: 250,
      render: (text, _, i) => (
        <div>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            maxCount={1}
            onChange={(info) => uploadImage(i + 1, info)}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          <div className={styles.imageFileNameWarp}>
            <PaperClipOutlined />
            <p className={styles.imageFileName}>{imageUploads[i + 1]?.name}</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={cx('wrap_add', styles.wrap)}>
      <h2 className="title_add">Preview</h2>
      <div className={cx('form_add', styles.formWrap)}>
        <Space direction="vertical" className={styles.infoCardWrap}>
          <Card className="back_shadow" title={testInfo.title} extra={<p>MBTI</p>} style={{ width: 650 }}>
            <div className={styles.infoWrap}>
              <p style={{ marginBottom: 25 }}>{testInfo.content}</p>
              <div>
                <Upload
                  name="file"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  onChange={(info) => uploadImage(0, info)}
                  maxCount={1}
                >
                  <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
                <p className={styles.imageFileName}>{imageUploads[0]?.name}</p>
              </div>
            </div>
          </Card>
        </Space>
        <Table
          className="back_shadow"
          columns={questionsColumns}
          dataSource={testData.questions.map((question) => ({
            ...question,
            key: question.index,
          }))}
          bordered
          pagination={false}
          scroll={{ y: 500 }}
          title={() => 'Questions'}
        />
        <Table
          className="back_shadow"
          columns={resultsColumns}
          dataSource={testData.results.map((result) => ({
            ...result,
            key: result.result,
          }))}
          bordered
          pagination={false}
          scroll={{ y: 500 }}
          title={() => 'Results'}
        />
      </div>
      {loading ? (
        <p>업데이트 중..(로딩화면 만들게요..기다려주세요)</p>
      ) : (
        <div className={'button_box'}>
          <PrevButton />
          {isDisabled ? <SaveButton onClick={onClick} /> : <p>모든 이미지를 첨부해주세요!</p>}
        </div>
      )}
    </div>
  );
}
