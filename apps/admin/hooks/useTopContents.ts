import { useState } from 'react';

import { getTopContentsAPI } from '@/services/contents';
import { TopContents } from '@/types/count';

export const useTopContents = () => {
  const [topContents, setTopContents] = useState<TopContents[]>();

  const getTopContents = async (option: string, quantity: number) => {
    try {
      const response = await getTopContentsAPI(option, quantity);
      if (response) {
        setTopContents(response.data);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return {
    getTopContents,
    topContents,
  };
};
