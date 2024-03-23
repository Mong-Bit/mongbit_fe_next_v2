import { useState } from 'react';

import { deleteContentAPI, getContentAPI, getContentListAPI } from '@/services/contents';

import { ContentList } from '@/types/test';

export const useContents = () => {
  const [contentList, setContentList] = useState<ContentList[]>([]);
  const [loading, setLoading] = useState(false);

  const getContentList = async () => {
    setLoading(true);
    try {
      const response = await getContentListAPI();
      if (response) {
        setContentList(response.data);
      }
    } catch (error) {
      alert(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

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

  const deleteContent = async (id: string) => {
    try {
      await deleteContentAPI(id);
      getContentList();
    } catch (error) {
      alert(`error: ${error}`);
    }
  };

  return {
    contentList,
    loading,
    getContent,
    getContentList,
    deleteContent,
  };
};
