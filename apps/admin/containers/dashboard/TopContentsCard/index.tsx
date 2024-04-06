'use client';

import { Radio, RadioChangeEvent } from 'antd';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { TOP_COUNT_OPTIONS } from '@/constants/constant';
import { useTopContents } from '@/hooks/useTopContents';

import styles from './index.module.scss';
import DashboardSelect from '@/components/lib/antd/DashboardSelect';

const TopContentsCard = () => {
  const { topContents, getTopContents } = useTopContents();
  const [selectOptions, setSelectOptions] = useState(TOP_COUNT_OPTIONS[0].value);
  const [radioValue, setRadioValue] = useState(5);

  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  useEffect(() => {
    getTopContents(selectOptions, radioValue);
  }, [radioValue, selectOptions]);

  return (
    <div className={cx('contentCard', styles.topContentsCard, 'back_shadow')}>
      <div className={styles.topContentTitle}>
        <h2>Top Contents</h2>
        <DashboardSelect setSelectOptions={setSelectOptions} defaultValue={TOP_COUNT_OPTIONS} />
        <Radio.Group buttonStyle="solid" optionType="button" size="small" onChange={onChangeRadio} value={radioValue}>
          <Radio value={5}>5개</Radio>
          <Radio value={10}>10개</Radio>
        </Radio.Group>
      </div>
      <ul>
        {topContents?.map((topContent) => (
          <li key={topContent.testId}>
            <p>{topContent.title}</p>
            <span>{topContent.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopContentsCard;
