import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, TableProps, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

import styles from './index.module.scss';

import { MbtiQuestions, MbtiResults, MbtiTest } from '@/types/test';

type Props = {
  isUpdateTest: boolean;
  testData: MbtiTest;
  imageUploads: File[];
  uploadImage: (index: number, info: UploadChangeParam<UploadFile>) => void;
};

export default function TableColumns({ isUpdateTest, testData, imageUploads, uploadImage }: Props) {
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
              <p className={styles.imageFileName}>{testData.results[i].imageUrl}</p>
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