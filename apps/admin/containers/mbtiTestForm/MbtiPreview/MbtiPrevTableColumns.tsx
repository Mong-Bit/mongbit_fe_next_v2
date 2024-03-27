import { PaperClipOutlined } from '@ant-design/icons';
import { TableProps } from 'antd';
import { useRecoilValue } from 'recoil';

import styles from './index.module.scss';

import { mbtiImageState } from '@/states/testUpdateDataState';
import { MbtiQuestions, MbtiResults } from '@/types/test';

export default function TableColumns() {
  const imageUploads = useRecoilValue(mbtiImageState);

  const questionNames = ['E / I', 'N / S', 'F / T', 'J / P'];

  const questionsColumns: TableProps<MbtiQuestions>['columns'] = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: 120,
      render: (text, _, i) => (
        <p key={text}>
          [ {questionNames[Math.floor(i / 3)]} ] 질문 {text + 1}
        </p>
      ),
    },
    {
      title: 'Question',
      key: 'question',
      dataIndex: 'question',
    },
    {
      title: 'AnswerPlus',
      key: 'answerPlus',
      dataIndex: 'answerPlus',
    },
    {
      title: 'AnswerMinus',
      key: 'answerMinus',
      dataIndex: 'answerMinus',
    },
  ];

  const resultsColumns: TableProps<MbtiResults>['columns'] = [
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      align: 'center',
      width: 100,
    },
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Content',
      key: 'content',
      dataIndex: 'content',
    },
    {
      title: 'Image URL',
      key: 'imageUrl',
      dataIndex: 'imageUrl',
      width: 250,
      render: (text, _, i) => (
          <p key={text} className={styles.imageFileName}>
            <PaperClipOutlined />
            {imageUploads[i + 1]?.name}
          </p>
      ),
    },
  ];

  return {
    questionsColumns,
    resultsColumns,
  };
}
