import { Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';

import { CONTENTS_COUNT_OPTIONS } from '@/constants/constant';
import { DETALIS, PATHS_ID } from '@/constants/paths';
import { getContentAPI, getLatestContentAPI, getLinkCountAPI, getSharesCountAPI } from '@/services/contents';
import { LatestMbti } from '@/types/contents';
import { useQuery } from '@tanstack/react-query';

const LatestContentCard = () => {
  const router = useRouter();

  const { data: latestContent, isLoading } = useQuery({
    queryKey: ['getLatestContents'],
    queryFn: async () => {
      const res = await getLatestContentAPI(0, 1);
      const testData = res.data.testCoverDTOList[0];

      const [sharesCount, linkCount, content] = await Promise.all([
        getSharesCountAPI(testData.id),
        getLinkCountAPI(testData.id),
        getContentAPI(testData.id),
      ]);

      return {
        ...testData,
        sharesCount: sharesCount.data,
        linkCount: linkCount.data,
        type: content.data.test.type,
        createDate: content.data.test.createDate,
      };
    },
  });


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
