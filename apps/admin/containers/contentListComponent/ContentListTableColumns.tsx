'use client';

import { Button, Popconfirm, TableProps } from 'antd';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

import { useContents } from '@/hooks/useContents';

import styles from './index.module.scss';

import { isUpdateTestState } from '@/states/testInfoState';

export default function contentListTableColumns(useResetMbtiTestData: () => void) {
  const { deleteContent } = useContents();
  const router = useRouter();

  const setIsUpdateTest = useSetRecoilState(isUpdateTestState);

  const onClickDeleteBtn = async (testId: string) => {
    try {
      await deleteContent(testId);
      alert(`삭제 완료`);
    } catch (error) {
      alert(`error : ${error}`);
    }
  };

  const onClickUpdateBtn = (testId: string) => {
    useResetMbtiTestData();
    setIsUpdateTest(true);
    router.push(`/contents/update/${testId}/mbti`);
  };

  const columns: TableProps['columns'] = [
    {
      title: 'Thumbnail',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => (
        <div style={{ width: '90px', height: '60px', overflow: 'hidden', position: 'relative' }}>
          <Image src={text} fill sizes="100%" alt="testImage" />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a className={styles.contentTitle}>{text}</a>,
    },
    {
      title: 'Plays',
      dataIndex: 'playCount',
      key: 'playCount',
    },
    {
      title: 'Link Copies',
      dataIndex: 'linkCount',
      key: 'linkCount',
    },
    {
      title: 'Shares',
      dataIndex: 'sharesCount',
      key: 'sharesCount',
    },
    {
      title: 'Likes',
      dataIndex: 'likeCount',
      key: 'likeCount',
    },
    {
      title: 'Comments',
      dataIndex: 'commentCount',
      key: 'commentCount',
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (time) => <p>{new Date(time).toLocaleDateString()}</p>,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (test) => (
        <div className={styles.btnWarp}>
          <Button onClick={() => onClickUpdateBtn(test)}>수정</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onClickDeleteBtn(test)}
          >
            <Button danger>삭제</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return columns;
}
