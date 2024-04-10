import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { USER_INFO } from '@/constants/constant';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'sessionStorage',
  storage: sessionStorage,
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

export const userRoleState = atom({
  key: 'userRoleState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
