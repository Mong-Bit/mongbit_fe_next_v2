'use client';

import { Button, Popconfirm, Space, TableProps } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';

import { CONTENTS_COUNT_OPTIONS } from '@/constants/constant';
import { PathsId } from '@/constants/paths';
import { useContents } from '@/hooks/useContents';
import { isEditTestState } from '@/states/testUpdateDataState';

import styles from './index.module.scss';

export default function contentsTableColumns(useResetMbtiTestData: () => void) {
  const { deleteContent } = useContents();
  const router = useRouter();

  const setIsEditTestt = useSetRecoilState(isEditTestState);

  const onClickDeleteBtn = (testId: string) => {
    deleteContent(testId);
    alert(`삭제 완료`);
  };

  const onClickEditBtn = (testId: string) => {
    useResetMbtiTestData();
    setIsEditTestt(true);
    router.push(PathsId(testId));
  };

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
      width: 250,

      render: (text) => <a className={styles.contentTitle}>{text}</a>,
    },
    {
      title: 'Counts',
      children: CONTENTS_COUNT_OPTIONS.map((option) => ({
        title: option[1],
        dataIndex: option[0],
        key: option[0],
        width: 85,
        align: 'center',
      })),
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'center',
      width: 130,
      render: (time) => <p>{new Date(time).toLocaleDateString('en-CA')}</p>,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (test) => (
        <Space>
          <Button size="small" onClick={() => onClickEditBtn(test)}>
            수정
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onClickDeleteBtn(test)}
          >
            <Button size="small" danger>
              삭제
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return columns;
}
