import { useState } from 'react';
import { useRecoilState } from 'recoil';

import {
  getCommentCountAPI,
  getContentAPI,
  getLikeCountAPI,
  getLinkCountAPI,
  getSharesCountAPI,
} from '@/services/contents';
import { mbtiTestDataState } from '@/states/contentUpdateState';
import { MbtiTest } from '@/types/contents';
import { Counts } from '@/types/count';

export const useContentData = () => {
  const [contentData, setContentData] = useRecoilState<MbtiTest>(mbtiTestDataState);

  const [contentCountData, setContentCountData] = useState<Counts[]>([]);

  const getContent = async (testId: string) => {
    try {
      const response = await getContentAPI(testId);
      if (response) {
        setContentData(response.data);
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  const getContentCounts = async (testId: string) => {
    try {
      Promise.all([
        getSharesCountAPI(testId),
        getLinkCountAPI(testId),
        getCommentCountAPI(testId),
        getLikeCountAPI(testId),
      ]).then(([sharesCount, linkCount, commentCount, likeCount]): void => {
        setContentCountData([
          {
            name: 'Shares',
            count: sharesCount.data,
          },
          {
            name: 'Link Copies',
            count: linkCount.data,
          },
          { name: 'Likes', count: likeCount.data },
          {
            name: 'Comments',
            count: commentCount.data,
          },
        ]);
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return {
    getContent,
    contentData,
    getContentCounts,
    contentCountData,
  };
};
