import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'DarkMode',
  storage: localStorage,
});

export const isDarkModeState = atom({
  key: 'isDarkModeState',
  default: true,
  effects_UNSTABLE: [persistAtom],
});
