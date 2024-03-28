import { atom } from 'recoil';

import { DateRangeCounts } from '@/types/count';

export const dailyCountsDataState = atom<DateRangeCounts[]>({
  key: 'dailyCountsDataState',
  default: [],
});
