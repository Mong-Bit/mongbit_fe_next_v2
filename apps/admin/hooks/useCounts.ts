import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { getDateRangeCountsAPI, getTotalCountsAPI } from '@/services/contents';
import { dailyCountsState } from '@/states/dailyCountsState';
import { Counts, DateRangeCounts } from '@/types/count';

const INITIAL_SUM_COUNTS = {
  visitsCount: 0,
  playsCount: 0,
  loginsCount: 0,
  kakaoSharesCount: 0,
  linkSharesCount: 0,
  likesCount: 0,
  commentsCount: 0,
};

export const useCounts = () => {
  const [totalCountsData, setTotalCountsData] = useState<Counts[]>();
  const [dateRangeCountData, setDateRangeCountsData] = useRecoilState<DateRangeCounts[]>(dailyCountsState);
  const [isLoading, setIsLoading] = useState(false);

  const getTotalCountsData = async (startDate: string, endDate: string) => {
    setIsLoading(true);

    const [totalCounts, dateRangeCounts] = await Promise.all([
      getTotalCountsAPI(),
      getDateRangeCountsAPI(startDate, endDate),
    ]);

    const sortedData = [...dateRangeCounts.data].sort((a, b) => {
      const dateA = new Date(a.date!).getTime();
      const dateB = new Date(b.date!).getTime();
      return dateA - dateB;
    });

    setDateRangeCountsData(sortedData);

    const sumDateRangeCounts = dateRangeCounts.data.reduce(
      (acc, curr) => ({
        date: '',
        visitsCount: acc.visitsCount + curr.visitsCount,
        playsCount: acc.playsCount + curr.playsCount,
        loginsCount: acc.loginsCount + curr.loginsCount,
        kakaoSharesCount: acc.kakaoSharesCount + curr.kakaoSharesCount,
        linkSharesCount: acc.linkSharesCount + curr.linkSharesCount,
        likesCount: acc.likesCount + curr.likesCount,
        commentsCount: acc.commentsCount + curr.commentsCount,
      }),
      INITIAL_SUM_COUNTS,
    );

    setTotalCountsData([
      {
        name: 'Visits',
        count: sumDateRangeCounts.visitsCount,
        totalCount: totalCounts.data.totalVisitsCount,
      },
      { name: 'Plays', count: sumDateRangeCounts.playsCount, totalCount: totalCounts.data.totalPlaysCount },
      {
        name: 'Logins',
        count: sumDateRangeCounts.loginsCount,
        totalCount: totalCounts.data.totalLoginsCount,
      },
      {
        name: 'Shares',
        count: sumDateRangeCounts.kakaoSharesCount,
        totalCount: totalCounts.data.totalSharesByKakao,
      },
      {
        name: 'Links',
        count: sumDateRangeCounts.linkSharesCount,
        totalCount: totalCounts.data.totalSharesByLink,
      },
      { name: 'Likes', count: sumDateRangeCounts.likesCount, totalCount: totalCounts.data.totalLikesCount },
      {
        name: 'Comments',
        count: sumDateRangeCounts.commentsCount,
        totalCount: totalCounts.data.totalCommentsCount,
      },
    ]);
    setIsLoading(false);
  };

  return {
    getTotalCountsData,
    totalCountsData,
    dateRangeCountData,
    isLoading,
  };
};
