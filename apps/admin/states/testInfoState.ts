import { atom } from 'recoil';

export const testInfoState = atom({
  key: 'testInfoState',
  default: {
    title: '',
    content: '',
    type: '',
  },
});