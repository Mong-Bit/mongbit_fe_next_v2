'use client';
import { Button, Pagination, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import cx from 'classnames';
import { useSetRecoilState } from 'recoil';

import { useContents } from '@/hooks/useContents';

import styles from './index.module.scss';
import AntdSearchInput from '@/components/lib/AntdSearchInput';
import AntdSelect from '@/components/lib/AntdSelect';
import contentListTableColumns from './ContentListTableColumns';

import { initialMbtiTestData, mbtiTestDataState } from '@/states/testDataState';
import { initialInfoTestData, isUpdateTestState, testInfoState } from '@/states/testInfoState';

export default function ContentListComponent() {
  const { getContentList, contentList, loading } = useContents();
  const resetTestInfo = useSetRecoilState(testInfoState);
  const resetMbtiTestData = useSetRecoilState(mbtiTestDataState);
  const setIsUpdateTest = useSetRecoilState(isUpdateTestState);

  const router = useRouter();

  useEffect(() => {
    getContentList();
  }, []);

  const useResetMbtiTestData = () => {
    resetMbtiTestData(initialMbtiTestData);
    resetTestInfo(initialInfoTestData);
  };

  const mbtiColumns = contentListTableColumns(useResetMbtiTestData);

  const onClickAddButton = () => {
    useResetMbtiTestData();
    setIsUpdateTest(false);
    router.push('/contents/add');
  };

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
      {loading ? (
        <div className={styles.loadBtnWrap}>
          <p> Loding... </p>
        </div>
      ) : (
        <Table
          columns={mbtiColumns}
          dataSource={contentList.map((content) => ({
            ...content,
            key: content.id,
          }))}
          pagination={false}
          size="small"
          scroll={{ x: 'calc(600px + 50%)' }}
        />
      )}
      <div className={styles.btnBox}>
        <Pagination defaultCurrent={1} total={10} />
      </div>
    </div>
  );
}
