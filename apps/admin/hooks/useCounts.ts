import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { getDateRangeCountsAPI, getTotalCountsAPI } from '@/services/contents';
import { dailyCountsState } from '@/states/dailyCountsState';
import { Counts, DateRangeCounts } from '@/types/count';

export const useCounts = () => {
  const [totalCountsData, setTotalCountsData] = useState<Counts[]>();
  const [dateRangeCountData, setDateRangeCountsData] = useRecoilState<DateRangeCounts[]>(dailyCountsState);

  const getTotalCountsData = async (startDate: string, endDate: string) => {
    try {
      Promise.all([getTotalCountsAPI(), getDateRangeCountsAPI(startDate, endDate)]).then(
        ([totalCounts, dateRangeCounts]): void => {
          setDateRangeCountsData(dateRangeCounts.data);

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
            {
              date: '',
              visitsCount: 0,
              playsCount: 0,
              loginsCount: 0,
              kakaoSharesCount: 0,
              linkSharesCount: 0,
              likesCount: 0,
              commentsCount: 0,
            },
          );

          setTotalCountsData([
            {
              name: 'Visits',
              count: sumDateRangeCounts.visitsCount + 0,
              totalCount: totalCounts.data.totalVisitsCount,
            },
            { name: 'Plays', count: sumDateRangeCounts.playsCount, totalCount: totalCounts.data.totalPlaysCount },
            {
              name: 'Logins',
              count: sumDateRangeCounts.loginsCount + 0,
              totalCount: totalCounts.data.totalLoginsCount,
            },
            {
              name: 'Shares',
              count: sumDateRangeCounts.kakaoSharesCount,
              totalCount: totalCounts.data.totalSharesByKakao,
            },
            {
              name: 'Link Copies',
              count: sumDateRangeCounts.linkSharesCount + 0,
              totalCount: totalCounts.data.totalSharesByLink,
            },
            { name: 'Likes', count: sumDateRangeCounts.likesCount, totalCount: totalCounts.data.totalLikesCount },
            {
              name: 'Comments',
              count: sumDateRangeCounts.commentsCount + 0,
              totalCount: totalCounts.data.totalCommentsCount,
            },
          ]);
        },
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return {
    getTotalCountsData,
    totalCountsData,
    dateRangeCountData,
  };
};
