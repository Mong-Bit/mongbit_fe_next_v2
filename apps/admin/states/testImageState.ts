import { atom } from 'recoil';

export const mbtiImageState = atom<File[]>({
  key: 'mbtiImageState',
  default: Array(17).fill(undefined),
});
