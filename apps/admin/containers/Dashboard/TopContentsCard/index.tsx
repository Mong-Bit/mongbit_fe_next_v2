'use client';

import { Card, Flex, List, Radio, RadioChangeEvent } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

import { TOP_COUNT_OPTIONS } from '@/constants/constant';
import { DETALIS, PATHS_ID } from '@/constants/paths';
import { getTopContentsAPI } from '@/services/contents';

import DashboardSelect from '@/components/lib/antd/DashboardSelect';
import { useQuery } from '@tanstack/react-query';

const TopContentsCard = () => {
  const [selectOptions, setSelectOptions] = useState(TOP_COUNT_OPTIONS[0].value);
  const [radioValue, setRadioValue] = useState(5);

  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const onChange = (value: string) => {
    setSelectOptions(value);
  };

  const { data: topContents, isLoading } = useQuery({
    queryKey: ['getTopContents', selectOptions],
    queryFn: () =>
      getTopContentsAPI({
        option: selectOptions,
        quantity: 10,
      }).then((res) => res.data),
  });

  return (
    <Card style={{ width: 400 }}>
      <Flex vertical justify="center" align="space-between" style={{ width: '100%' }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
          <h3>Top Contents</h3>
          <DashboardSelect onChange={onChange} defaultValue={TOP_COUNT_OPTIONS} />
          <Radio.Group optionType="button" size="small" onChange={onChangeRadio} value={radioValue}>
            <Radio value={5}>5개</Radio>
            <Radio value={10}>10개</Radio>
          </Radio.Group>
        </Flex>
        <List
          size="small"
          bordered
          loading={isLoading}
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
