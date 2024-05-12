'use client';

import { Card, Flex, List, Radio, RadioChangeEvent } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { TOP_COUNT_OPTIONS } from '@/constants/constant';
import { DETALIS, PATHS_ID } from '@/constants/paths';
import useAsyncAction from '@/hooks/useAsyncAction';
import { getTopContentsAPI } from '@/services/contents';
import { TopContents } from '@/types/count';

import DashboardSelect from '@/components/lib/antd/DashboardSelect';

const TopContentsCard = () => {
  const [selectOptions, setSelectOptions] = useState(TOP_COUNT_OPTIONS[0].value);
  const [radioValue, setRadioValue] = useState(5);
  const [topContents, setTopContents] = useState<TopContents[]>();

  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const getTopContents = async ({ option, quantity }: { option: string; quantity: number }) => {
    const response = await getTopContentsAPI(option, quantity);
    if (response) {
      setTopContents(response.data);
    }
  };
  const [isLoading, executeGetTopContents] = useAsyncAction(getTopContents, { option: selectOptions, quantity: 10 });

  useEffect(() => {
    executeGetTopContents();
  }, [selectOptions]);

  return (
    <Card loading={isLoading} style={{ width: 400 }}>
      <Flex vertical justify="center" align="space-between" style={{ width: '100%' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
          <h3>Top Contents</h3>
          <DashboardSelect setSelectOptions={setSelectOptions} defaultValue={TOP_COUNT_OPTIONS} />
          <Radio.Group optionType="button" size="small" onChange={onChangeRadio} value={radioValue}>
            <Radio value={5}>5개</Radio>
            <Radio value={10}>10개</Radio>
          </Radio.Group>
        </Flex>
        <List
          size="small"
          bordered
          dataSource={topContents ? topContents.slice(0, radioValue) : []}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Flex justify="space-between">
                    <Link href={PATHS_ID(item.testId, DETALIS)}>{item.title}</Link>
                    <span>{item.value}</span>
                  </Flex>
                }
              />
            </List.Item>
          )}
        />
      </Flex>
    </Card>
  );
};

export default TopContentsCard;
