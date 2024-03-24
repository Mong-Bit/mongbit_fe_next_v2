import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, TableProps, Upload } from 'antd';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';

import { useImageUpload } from '@/hooks/useImageUpload';

import styles from './index.module.scss';

import { MbtiQuestions, MbtiResults } from '@/types/test';
import { mbtiImageState } from '@/states/testImageState';
import { mbtiTestDataState } from '@/states/testDataState';
import { isUpdateTestState } from '@/states/testInfoState';

export default function TableColumns() {
  const { uploadImage } = useImageUpload();
  const isUpdateTest = useRecoilValue(isUpdateTestState);
  const testData = useRecoilValue(mbtiTestDataState);
  const imageUploads = useRecoilValue(mbtiImageState);

  const questionNames = ['E / I', 'N / S', 'F / T', 'J / P'];

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
            {isUpdateTest ? (
              <>
                <div
                  style={{ width: '90px', height: '60px', overflow: 'hidden', position: 'relative', margin: 'auto' }}
                >
                  <Image src={testData!.results[i]!.imageUrl!} fill sizes="100%" alt="testImage" quality={5} priority />
                </div>
                <p className={styles.imageFileName}>{testData.results[i].imageUrl}</p>
              </>
            ) : (
              <p className={styles.imageFileName}>{imageUploads[i + 1]?.name}</p>
            )}
          </div>
        </div>
      ),
    },
  ];

  return {
    questionsColumns,
    resultsColumns,
  };
}
