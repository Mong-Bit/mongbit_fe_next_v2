import { Card, Flex } from 'antd';
import { useEffect, useState } from 'react';

import { CONTENTS_COUNT_OPTIONS } from '@/constants/constant';
import { getContentAPI, getLatestContentAPI, getLinkCountAPI, getSharesCountAPI } from '@/services/contents';
import { LatestMbti } from '@/types/contents';

const LatestContentCard = () => {
  const [latestContent, setLatestContent] = useState<LatestMbti>();

  const getLatestContent = async (page: number, size: number) => {
    try {
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
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  useEffect(() => {
    getLatestContent(0, 1);
  }, []);

  return (
    <Card style={{ width: 400, height: 200 }}>
      <Flex vertical align="center" justify="center" gap="middle">
        <h3>Latest Content Insight</h3>
        <Card size="small" style={{ width: '100%' }}>
          <Flex align="center" justify="space-between">
            <p>{latestContent?.title}</p>
            <Flex align="center" justify="space-between" style={{ width: 110 }}>
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
