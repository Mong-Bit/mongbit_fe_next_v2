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

  const countWidthSize = 85;

  const columns: TableProps['columns'] = [
    {
      title: 'Thumbnail',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 120,
      align: 'center',
      render: (text) => (
        <div style={{ width: '90px', height: '60px', overflow: 'hidden', position: 'relative', margin: 'auto' }}>
          <Image src={text} fill sizes="100%" alt="testImage" priority quality={5} />
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
      title: 'Counts',
      children: [
        {
          title: 'Plays',
          dataIndex: 'playCount',
          key: 'playCount',
          width: countWidthSize,
          align: 'center',
        },
        {
          title: 'Link Copies',
          dataIndex: 'linkCount',
          key: 'linkCount',
          width: countWidthSize,
          align: 'center',
        },
        {
          title: 'Shares',
          dataIndex: 'sharesCount',
          key: 'sharesCount',
          width: countWidthSize,
          align: 'center',
        },
        {
          title: 'Likes',
          dataIndex: 'likeCount',
          key: 'likeCount',
          width: countWidthSize,
          align: 'center',
        },
        {
          title: 'Comments',
          dataIndex: 'commentCount',
          key: 'commentCount',
          width: countWidthSize,
          align: 'center',
        },
      ],
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'center',
      width: 130,
      render: (time) => <p>{new Date(time).toLocaleDateString()}</p>,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 140,
      align: 'center',
      fixed: 'right',
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
