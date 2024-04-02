'use client';

import { Button, Select, Table } from 'antd';
import Search from 'antd/es/input/Search';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { Paths } from '@/constants/paths';
import { useContents } from '@/hooks/useContents';
import { useImageUpload } from '@/hooks/useImageUpload';
import { initialMbtiTestData, mbtiTestDataState, isEditContentState } from '@/states/contentUpdateState';

import contentsTableColumns from './contentsTableColumns';
import styles from './index.module.scss';

const pageSize = 5;

export default function ContentsComponent() {
  const { getContents, contentsData } = useContents();
  const { deleteImageFileArray } = useImageUpload();
  const resetMbtiTestData = useSetRecoilState(mbtiTestDataState);
  const setIsEditContent = useSetRecoilState(isEditContentState);
  const [page, setPage] = useState(0);

  const router = useRouter();

  const useResetMbtiTestData = () => {
    resetMbtiTestData(initialMbtiTestData);
    deleteImageFileArray();
  };

  const mbtiColumns = contentsTableColumns(useResetMbtiTestData);

  const onClickRegisterButton = () => {
    useResetMbtiTestData();
    setIsEditContent(false);
    router.push(Paths.contentsRegister);
  };

  useEffect(() => {
    getContents(page, pageSize);
  }, [page]);

  return (
    <div className={cx(styles.wrap)}>
      <div className={styles.topBox}>
        <div className={styles.searchBox}>
          <Select style={{ width: 120 }} />
          <p>Member ID</p>
          <Search placeholder="input search text" onSearch={(value) => console.log(value)} style={{ width: 300 }} />
        </div>
        <Button onClick={onClickRegisterButton}>Add Content</Button>
      </div>
      <Table
        columns={mbtiColumns}
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
