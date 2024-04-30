import { Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { CONTENTS_COUNT_OPTIONS } from '@/constants/constant';
import { DETALIS, PATHS_ID } from '@/constants/paths';
import useAsyncAction from '@/hooks/useAsyncAction';
import useLatestContents from '@/hooks/useLatestContents';
import { LatestMbti } from '@/types/contents';

const LatestContentCard = () => {
  const { latestContent, getLatestContents } = useLatestContents();
  const { isLoading, executeAsyncAction } = useAsyncAction(getLatestContents);

  const router = useRouter();

  useEffect(() => {
    executeAsyncAction(0, 1);
  }, []);

  return (
    <Card loading={isLoading} style={{ width: 400, height: 200 }}>
      <Flex vertical align="center" justify="center" gap="middle">
        <h3>Latest Content Insight</h3>
        <Card
          size="small"
          hoverable
          onClick={() => router.push(PATHS_ID(latestContent!.id, DETALIS))}
          style={{ width: '100%' }}
        >
          <Flex align="center" justify="space-between">
            <p>{latestContent?.title}</p>
            <Flex align="center" justify="space-between" style={{ width: 120 }}>
              <p>{latestContent?.type}</p>
              <p>
                {latestContent &&
                  latestContent.createDate &&
                  new Date(latestContent.createDate).toLocaleDateString('en-CA')}
              </p>
            </Flex>
          </Flex>
        </Card>
        <Flex align="center" justify="space-around" style={{ width: '100%' }}>
          {CONTENTS_COUNT_OPTIONS.map((option) => (
            <Flex vertical align="center" justify="space-around" key={option.label}>
              <p>{option.label}</p>
              <p>{latestContent && latestContent[option.value as keyof LatestMbti]}</p>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default LatestContentCard;
