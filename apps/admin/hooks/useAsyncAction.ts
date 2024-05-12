import { useState } from 'react';

const useAsyncAction = <T>(actionFunction: (args: T) => Promise<void>, args?: T) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeAsyncAction = async () => {
    setIsLoading(true);
    await actionFunction(args!);
    setIsLoading(false);
  };

  return [isLoading, executeAsyncAction] as const;
};

export default useAsyncAction;
