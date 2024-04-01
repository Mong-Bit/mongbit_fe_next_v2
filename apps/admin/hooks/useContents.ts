import { useState } from 'react';

import {
  deleteContentAPI,
  getContentAPI,
  getContentsAPI,
  getLatestContentAPI,
  getLinkCountAPI,
  getSharesCountAPI,
} from '@/services/contents';
import { ContentsCover, LatestMbti } from '@/types/test';

export const useContents = () => {
  const [contentsData, setContentsData] = useState<ContentsCover>({
    contentList: [],
    count: 0,
  });
  const [loading, setLoading] = useState(false);
  const [latestContent, setLatestContent] = useState<LatestMbti>();

  const getContents = async (page: number, size: number) => {
    try {
      const response = await getContentsAPI(page, size);
      if (response) {
        setContentsData(response.data);
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

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
            type: content.data.type,
            createDate: content.data.createDate as string,
          }));
        });
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      setLoading(true);
      await deleteContentAPI(id);
      return getContents(0, 5);
    } catch (error) {
      alert(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    contentsData,
    loading,
    getContents,
    deleteContent,
    latestContent,
    getLatestContent,
  };
};