import axios, { AxiosResponse } from 'axios';

import { DOMAIN_BE_PROD } from '@/constants/domain';
import { creatHeaders } from '@/utils/utils';

import { apiBe_v1 } from '.';

export const postImageUplodAPI = (data: FormData): Promise<AxiosResponse<string>> => {
  const headers = creatHeaders('multipart/form-data');
  return axios.post(`${DOMAIN_BE_PROD}/upload`, data, { headers });
};

export const postMbtiTestAPI = (data: string) => {
  const headers = creatHeaders('application/json');
  apiBe_v1.post(`tests/test`, data, { headers });
};

export const updateMbtiTestAPI = (data: string) => {
  const headers = creatHeaders('application/json');
  apiBe_v1.patch(`tests/test`, data, { headers });
};
