import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { getContentAPI } from '@/services/contents';
import { mbtiTestDataState } from '@/states/contentUpdateState';
import { MbtiTest } from '@/types/contents';

export const useContent = (testId: string) => {
  const [contentData, setContentData] = useRecoilState<MbtiTest>(mbtiTestDataState);
  const [isLoading, setIsLoading] = useState(false);

  const getContent = async () => {
    setIsLoading(true);

    const response = await getContentAPI(testId);
    if (response) {
      setContentData(response.data.test);
    }

    setIsLoading(false);
  };

  return {
    getContent,
    contentData,
    isLoading,
  };
};
