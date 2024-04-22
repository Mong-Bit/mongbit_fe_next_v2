import { useRecoilState } from 'recoil';

import { getContentAPI } from '@/services/contents';
import { mbtiTestDataState } from '@/states/contentUpdateState';
import { MbtiTest } from '@/types/contents';

export const useContent = (testId: string) => {
  const [contentData, setContentData] = useRecoilState<MbtiTest>(mbtiTestDataState);

  const getContent = async () => {
    try {
      const response = await getContentAPI(testId);
      if (response) {
        setContentData(response.data.test);
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
