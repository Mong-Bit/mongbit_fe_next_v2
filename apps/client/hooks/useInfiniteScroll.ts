import { useEffect, useRef, useState } from 'react';

type CallbackProps = (...args: any[]) => Promise<void>;

const useInfiniteScroll = (callback: CallbackProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const obsTarget = useRef<HTMLDivElement>(null);

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    if (isLoading) return;

    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await callback({ page });
    setIsLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });
    if (obsTarget.current) observer.observe(obsTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [obsTarget.current]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return {
    obsTarget,
    isLoading,
  };
};

export default useInfiniteScroll;
