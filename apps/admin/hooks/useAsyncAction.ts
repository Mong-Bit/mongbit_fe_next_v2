import { useState } from 'react';

const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const executeAsyncAction = async <T>(actionFunction: (args: T) => Promise<void>, args?: T) => {
    setIsLoading(true);
    await actionFunction(args!);
    setIsLoading(false);
  };

  return { isLoading, executeAsyncAction };
};

export default useAsyncAction;
