import { notFound } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type CallbackProps = (...args: any[]) => Promise<void>;

const useInfiniteScroll = (callback: CallbackProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const preventRef = useRef(true);
  const obsTarget = useRef<HTMLDivElement>(null);

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    if (isLoading) return;

    const target = entries[0];
    if (target.isIntersecting) {
      setIsLoading(true);
      preventRef.current = false;
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchData = async () => {
    try {
      await callback({ page });

      setIsLoading(false);
      preventRef.current = true;
    } catch (err: any) {
      const status = err.response.status;

      switch (status) {
        case 404:
          return notFound();
        default:
          throw new Error('Failed to fetch data');
      }
    }
  };

  useEffect(() => {
    fetchData();

    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });
    if (obsTarget.current) observer.observe(obsTarget.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (page > 0) fetchData();
  }, [page]);

  return {
    obsTarget,
    isLoading,
  };
};

export default useInfiniteScroll;
