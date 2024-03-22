'use client';
import { Button, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import cx from 'classnames';
import { useSetRecoilState } from 'recoil';

import { useContents } from '@/hooks/useContents';

import styles from './index.module.scss';
import AntdSearchInput from '@/components/lib/AntdSearchInput';
import AntdSelect from '@/components/lib/AntdSelect';
import contentListTableColumns from './ContentListTableColumns';

import { mbtiTestDataState } from '@/states/testDataState';
import { testInfoState } from '@/states/testInfoState';

export default function ContentList() {
  const { getContentList, contentList, loading } = useContents();
  const resetTestInfo = useSetRecoilState(testInfoState);
  const resetMbtiTestData = useSetRecoilState(mbtiTestDataState);
  const [loadData, setLoadData] = useState(true);

  const router = useRouter();

  const useResetMbtiTestData = () => {
    resetMbtiTestData((prev) => ({
      ...prev,
      title: '',
      content: '',
      imageUrl: '',
      questions: [],
      results: [],
    }));
    resetTestInfo((prev) => ({
      ...prev,
      title: '',
      content: '',
      type: '',
    }));
  };

  const columns = contentListTableColumns(useResetMbtiTestData);

  const onClickAddButton = () => {
    useResetMbtiTestData();
    router.push('/contents/add');
  };

  // test시에만 사용, list용 api 생성 될 때까지
  const onClickLoadDataBtn = () => {
    setLoadData(false);
    getContentList();
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
