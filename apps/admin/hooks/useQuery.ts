import { AxiosResponse } from 'axios';
import { useState } from 'react';

const useQuery = <T, S>(
  actionFunction: (params: S) => Promise<AxiosResponse<T>>,
  params: S,
): [data: T | undefined, fechData: () => Promise<void>, isLoading: boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();

  const fetchData = async () => {
    setIsLoading(true);

    const response = await actionFunction(params);
    setData(response.data);

    setIsLoading(false);
  };

  return [data, fetchData, isLoading];
};

export default useQuery;
