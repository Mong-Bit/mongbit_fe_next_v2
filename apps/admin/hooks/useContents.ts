import { useCallback, useState } from 'react';

import {
  deleteContentAPI,
  getContentAPI,
  getContentListAPI,
  getLinkCountAPI,
  getSharesCountAPI,
} from '@/services/contents';

import { ContentList } from '@/types/test';

export const useContents = () => {
  const [contentList, setContentList] = useState<ContentList[]>([]);
  const [loading, setLoading] = useState(false);

  const getContent = async (testId: string) => {
    try {
      const response = await getContentAPI(testId);
      if (response) {
        return response.data;
      }
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  const getContentList = useCallback(async () => {
    setLoading(true);
    try {
      const contents = await getContentListAPI();
      if (contents) {
        const constPromises = contents.data.map(async (content) => {
          const [contentDetail, sharesCount, linkCount] = await Promise.all([
            getContentAPI(content.id),
            getSharesCountAPI(content.id),
            getLinkCountAPI(content.id),
          ]);
          return {
            id: content.id,
            title: content.title,
            imageUrl: content.imageUrl,
            createDate: contentDetail.data.createDate,
            playCount: content.playCount,
            likeCount: content.likeCount,
            sharesCount: sharesCount.data,
            linkCount: linkCount.data,
            commentsCount: content.commentCount,
            type: content.type,
          };
        });
        const newContentList = await Promise.all(constPromises);
        setContentList(newContentList);
      }
    } catch (error) {
      alert(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteContent = async (id: string) => {
    try {
      await deleteContentAPI(id);
      getContentList();
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  return {
    getContentList,
    contentList,
    deleteContent,
    loading,
    getContent,

  };
};
