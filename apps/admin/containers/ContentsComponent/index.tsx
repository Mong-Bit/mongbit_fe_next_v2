'use client';

import { Button, Popconfirm, Select, Space, Table } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { CONTENTS_COUNT_OPTIONS } from '@/constants/constant';
import { Paths, PathsId } from '@/constants/paths';
import { useContents } from '@/hooks/useContents';
import { useImageUpload } from '@/hooks/useImageUpload';
import { initialMbtiTestData, mbtiTestDataState, isEditContentState } from '@/states/contentUpdateState';
import { ContentList } from '@/types/contents';

import styles from './index.module.scss';

const getColumns = ({
  onClickDeleteBtn,
  onClickEditBtn,
}: {
  onClickDeleteBtn: (testId: string) => void;
  onClickEditBtn: (testId: string) => void;
}): ColumnsType<ContentList> =>
  [
    {
      title: 'Thumbnail',
      key: 'imageUrl',
      width: 120,
      align: 'center',
      render: (_, { imageUrl }) => (
        <div style={{ width: '90px', height: '60px', overflow: 'hidden', position: 'relative', margin: 'auto' }}>
          <Image src={imageUrl} fill sizes="100%" alt="testImage" priority quality={5} />
        </div>
      ),
    },
    {
      title: 'Title',
      key: 'title',
      width: 250,
      render: (_, { title }) => <a className={styles.contentTitle}>{title}</a>,
    },
    {
      title: 'Counts',
      children: CONTENTS_COUNT_OPTIONS.map((option) => ({
        title: option.lable,
        key: option.value,
        width: 85,
        align: 'center',
      })),
    },
    {
      title: 'Created Date',
      key: 'createDate',
      align: 'center',
      width: 130,
      render: (_, { createDate }) => <p>{new Date(createDate).toLocaleDateString('en-CA')}</p>,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, { id }) => (
        <Space>
          <Button size="small" onClick={() => onClickEditBtn(id)}>
            수정
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onClickDeleteBtn(id)}
          >
            <Button size="small" danger>
              삭제
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

const pageSize = 5;

export default function ContentsComponent() {
  const { getContents, deleteContent, contentsData } = useContents();
  const { deleteImageFileArray } = useImageUpload();
  const initializationMbtiTestData = useSetRecoilState(mbtiTestDataState);
  const setIsEditContent = useSetRecoilState(isEditContentState);
  const [page, setPage] = useState(0);

  const router = useRouter();

  const resetMbtiTestData = () => {
    initializationMbtiTestData(initialMbtiTestData);
    deleteImageFileArray();
  };

  const onClickRegisterButton = () => {
    resetMbtiTestData();
    setIsEditContent(false);
    router.push(Paths.contentsRegister);
  };

  const columns = useMemo(
    () =>
      getColumns({
        onClickDeleteBtn: (testId: string) => {
          deleteContent(testId);
          alert(`삭제 완료`);
        },
        onClickEditBtn: (testId: string) => {
          resetMbtiTestData();
          setIsEditContent(true);
          router.push(PathsId(testId));
        },
      }),
    [],
  );

  // TODO: SSR 적용할 수 있도록 확인하기
  useEffect(() => {
    getContents(page, pageSize);
  }, [page]);

  return (
    <div className={cx(styles.wrap)}>
      <div className={styles.topBox}>
        <div className={styles.searchBox}>
          <Select style={{ width: 120 }} />
          <p>Member ID</p>
          <Search
            placeholder="input search text"
            onSearch={(value) => alert(`현재 지원하지 않아 ${value}을(를) 검색할 수 없습니다.`)}
            style={{ width: 300 }}
          />
        </div>
        <Button onClick={onClickRegisterButton}>Add Content</Button>
      </div>
      <Table
        columns={columns}
        dataSource={contentsData.contentList}
        rowKey="id"
        pagination={{
          position: ['bottomCenter'],
          total: contentsData.count,
          pageSize,
          onChange: (page) => setPage(page - 1),
        }}
      />
    </div>
  );
}
