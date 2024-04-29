import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PATHS_ACCESS_DENIED } from '@/constants/paths';

type ActionFunctionType = (...args: any[]) => Promise<void>;

const useAsyncAction = (actionFunction: ActionFunctionType) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const executeAsyncAction = async (...args: any[]) => {
    setIsLoading(true);

    try {
      await actionFunction(...args);
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;

        if (status === 403 || status === 404 || status === 500) {
          router.replace(PATHS_ACCESS_DENIED(status));
        } else {
          throw new Error(`${err}`);
        }
      } else {
        throw new Error(`${err}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, executeAsyncAction };
};

export default useAsyncAction;
