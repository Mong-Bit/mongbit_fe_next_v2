import axios, { AxiosResponse } from 'axios';

import { DOMAIN_BE_PROD } from '@/constants/domain';

import { apiBe_v1 } from '.';

import { creatHeaders } from '@/utils/utils';

export const postImageUplodAPI = (data: FormData): Promise<AxiosResponse<string>> => {
  const headers = creatHeaders('multipart/form-data');
  return axios.post(`${DOMAIN_BE_PROD}/upload`, data, { headers });
};

export const postAddMbtiTestAPI = (data: string) => {
  const headers = creatHeaders('application/json');
  return apiBe_v1.post(`tests/test`, data, { headers });
};
