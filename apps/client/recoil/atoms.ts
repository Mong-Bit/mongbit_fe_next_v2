import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { LOGIN } from '@/constants/constant';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
const { persistAtom } = recoilPersist({
  key: LOGIN.MONGBIT,
  storage: sessionStorage,
});

export const atomloginState = atom({
  key: 'recoil_login',
  default: {
    goPage: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const atomScore = atom({
  key: 'recoil_score',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
