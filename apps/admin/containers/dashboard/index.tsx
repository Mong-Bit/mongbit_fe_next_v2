'use client';

import { Flex } from 'antd';

import CountCardBox from './CountCardBox';
import LatestContentCard from './LatestContentCard';
import TopContentCard from './TopContentsCard';

export default function Dashboard() {
  return (
    <Flex vertical justify="center" align="center" gap={50}>
      <CountCardBox />
      <Flex wrap="wrap" gap={20}>
        <LatestContentCard />
        <TopContentCard />
      </Flex>
    </Flex>
  );
}
