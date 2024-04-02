import { atom } from 'recoil';

import { DateRangeCounts } from '@/types/count';

export const dailyCountsState = atom<DateRangeCounts[]>({
  key: 'dailyCountsState',
  default: [],
});
