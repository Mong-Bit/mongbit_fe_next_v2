import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { LOGIN } from '@/constants/constant';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
const { persistAtom } = recoilPersist({
  key: LOGIN.MONGBIT,
  storage: sessionStorage,
});

export const atomlogInState = atom({
  key: 'recoil_logIn',
  default: {
    goPage: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const selectorLogInState = selector({
  key: 'recoil_update_login',
  set: ({ set }, newState) => set(atomlogInState, newState),
  get: ({ get }) => get(atomlogInState),
});
