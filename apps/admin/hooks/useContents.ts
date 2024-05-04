import { useState } from 'react';

import { getContentsAPI } from '@/services/contents';
import { ContentsCover } from '@/types/contents';

export const useContents = () => {
  const [contentsData, setContentsData] = useState<ContentsCover>({
    contentList: [],
    count: 0,
  });

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

  return {
    getContents,
    contentsData,
  };
};
