import { atom } from 'recoil';

export const initialInfoTestData = {
  title: '',
  content: '',
  type: '',
};

export const testInfoState = atom({
  key: 'testInfoState',
  default: initialInfoTestData,
});

export const isUpdateTestState = atom({
  key: 'isUpdateTestState',
  default: false,
})