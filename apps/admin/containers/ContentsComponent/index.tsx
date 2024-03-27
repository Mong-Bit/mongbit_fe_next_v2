'use client';

import { Button, Table } from 'antd';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { Paths } from '@/constants/paths';
import { useContents } from '@/hooks/useContents';
import { useImageUpload } from '@/hooks/useImageUpload';

import contentsTableColumns from './contentsTableColumns';
import styles from './index.module.scss';
import AntdSearchInput from '@/components/lib/AntdSearchInput';
import AntdSelect from '@/components/lib/AntdSelect';

import { initialMbtiTestData, mbtiTestDataState, isEditTestState } from '@/states/testUpdateDataState';

const pageSize = 5;

export default function ContentsComponent() {
  const { getContents, contentsData } = useContents();
  const { deleteImageFileArray } = useImageUpload();
  const resetMbtiTestData = useSetRecoilState(mbtiTestDataState);
  const setIsEditTest = useSetRecoilState(isEditTestState);

  const router = useRouter();

  const [page, setPage] = useState(0);

  useEffect(() => {
    getContents(page, pageSize);
  }, [page]);

  const useResetMbtiTestData = () => {
    resetMbtiTestData(initialMbtiTestData);
    deleteImageFileArray();
  };

  const mbtiColumns = contentsTableColumns(useResetMbtiTestData);

  const onClickRegisterButton = () => {
    useResetMbtiTestData();
    setIsEditTest(false);
    router.push(Paths.contentsRegister);
  };

  return (
    <div className={cx(styles.wrap)}>
      <div className={styles.topBox}>
        <div className={styles.searchBox}>
          <AntdSelect />
          <p>Member ID</p>
          <AntdSearchInput />
        </div>
        <Button onClick={onClickRegisterButton}>Add Contents</Button>
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
