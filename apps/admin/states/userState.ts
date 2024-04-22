import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { USER, USER_INFO } from '@/constants/constant';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: USER,
  storage: localStorage,
});

export const userState = atom({
  key: USER_INFO,
  default: {
    memberId: '',
    username: '',
    thumbnail: '',
    registDate: '',
  },
  effects_UNSTABLE: [persistAtom],
});
