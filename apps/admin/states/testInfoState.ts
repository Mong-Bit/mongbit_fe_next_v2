import { atom } from 'recoil';

export const testInfoState = atom({
  key: 'testInfoState',
  default: {
    title: '',
    content: '',
    type: '',
  },
});

export const isUpdateTestState = atom({
  key: 'isUpdateTestState',
  default: false,
})