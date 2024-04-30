import { useState } from 'react';

import { getContentAPI, getLatestContentAPI, getLinkCountAPI, getSharesCountAPI } from '@/services/contents';
import { LatestMbti } from '@/types/contents';

const useLatestContents = () => {
  const [latestContent, setLatestContent] = useState<LatestMbti>();

  const getLatestContents = async (page: number, size: number) => {
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

  return {
    latestContent,
    getLatestContents,
  };
};

export default useLatestContents;