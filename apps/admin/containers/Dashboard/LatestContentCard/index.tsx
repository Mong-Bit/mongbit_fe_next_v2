import { Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CONTENTS_COUNT_OPTIONS } from '@/constants/constant';
import { DETALIS, PATHS_ID } from '@/constants/paths';
import useAsyncAction from '@/hooks/useAsyncAction';
import { getContentAPI, getLatestContentAPI, getLinkCountAPI, getSharesCountAPI } from '@/services/contents';
import { LatestMbti } from '@/types/contents';

const LatestContentCard = () => {
  const [latestContent, setLatestContent] = useState<LatestMbti>();

  const getLatestContents = async ({ page, size }: { page: number; size: number }) => {
    const response = await getLatestContentAPI(page, size);
    if (response) {
      setLatestContent((prev) => ({ ...prev, ...response.data.testCoverDTOList[0] }));
      Promise.all([
        getSharesCountAPI(response.data.testCoverDTOList[0].id),
        getLinkCountAPI(response.data.testCoverDTOList[0].id),
        getContentAPI(response.data.testCoverDTOList[0].id),
      ]).then(([sharesCount, linkCount, content]) => {
        setLatestContent((prev) => ({
          ...prev!,
          sharesCount: sharesCount.data,
          linkCount: linkCount.data,
          type: content.data.test.type,
          createDate: content.data.test.createDate as string,
        }));
      });
    }
  };

  const { isLoading, executeAsyncAction } = useAsyncAction();

  const router = useRouter();

  useEffect(() => {
    executeAsyncAction(getLatestContents, { page: 0, size: 1 });
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
