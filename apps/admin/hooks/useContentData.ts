import { useRecoilState } from 'recoil';

import { getContentAPI } from '@/services/contents';
import { mbtiTestDataState } from '@/states/contentUpdateState';

export const useContentData = () => {
  const [contentData, setContentData] = useRecoilState(mbtiTestDataState);

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

  return {
    getContent,
    contentData,
  };
};
