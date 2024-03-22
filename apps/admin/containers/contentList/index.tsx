'use client';
import { Button, Popconfirm, Table, TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import cx from 'classnames';
import { useSetRecoilState } from 'recoil';

import { useContents } from '@/hooks/useContents';

import styles from './index.module.scss';
import AntdSearchInput from '@/components/lib/AntdSearchInput';
import AntdSelect from '@/components/lib/AntdSelect';

import { isTestUpdateState } from '@/states/testUpdateState';

export default function ContentList() {
  const { getContentList, contentList, deleteContent, loading } = useContents();
  const setisTestUpdate = useSetRecoilState(isTestUpdateState);
  const [loadData, setLoadData] = useState(true);

  const router = useRouter();

  const onClickAddButton = () => {
    setisTestUpdate(true);
    router.push('/contents/add');
  };

  const onClickDeleteBtn = (testId: string) => {
    deleteContent(testId);
  };
  const onClickUpdateBtn = (testId: string) => {
    router.push(`/contents/update/${testId}/mbti`);
  };

  // test시에만 사용, list용 api 생성 될 때까지
  const onClickLoadDataBtn = () => {
    setLoadData(false);
    getContentList();
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
      dataIndex: 'commentsCount',
      key: 'commentsCount',
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
      key: 'createDate',
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

  return (
    <div className={cx(styles.wrap)}>
      <div className={styles.topBox}>
        <div className={styles.searchBox}>
          <AntdSelect />
          <p>Member ID</p>
          <AntdSearchInput />
        </div>
        <Button onClick={onClickAddButton}>Add Contens</Button>
      </div>
      {loadData ? (
        <div className={styles.loadBtnWrap}>
          <Button onClick={onClickLoadDataBtn}>Load Data</Button>
        </div>
      ) : loading ? (
        <div className={styles.loadBtnWrap}>
          <p> Loding... </p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={contentList.map((content) => ({
            ...content,
            key: content.id,
          }))}
        />
      )}
    </div>
  );
}
