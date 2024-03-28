import { useState } from 'react';

import { getTopContentAPI } from '@/services/contents';
import { TopContents } from '@/types/count';

export const useTopContents = () => {
  const [topContents, setTopContents] = useState<TopContents[]>();

  const getTopContent = async (option: string, quantity: number) => {
    try {
      const response = await getTopContentAPI(option, quantity);
      if (response) {
        setTopContents(response.data);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return {
    getTopContent,
    topContents,
  };
};
