import { atom } from 'recoil';

import { MessageState } from '@/types/util';

export const initMessageStatee: MessageState = {
  isOn: false,
  type: 'error',
  content: '',
};

export const messageState = atom<MessageState>({
  key: 'messageState',
  default: initMessageStatee,
});
