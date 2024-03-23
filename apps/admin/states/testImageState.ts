import { atom } from 'recoil';

export const initialMbtiImageArray = Array(17).fill(undefined)

export const mbtiImageState = atom<File[]>({
  key: 'mbtiImageState',
  default: initialMbtiImageArray,
});
