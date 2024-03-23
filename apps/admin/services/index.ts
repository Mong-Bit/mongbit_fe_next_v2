import axios from 'axios';

export const apiBe_v1 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/`,
  timeout: 3_000,
  withCredentials: true,
});

export const apiBe_v2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}/admin/api/v2/`,
  timeout: 10_000,
  withCredentials: true,
});
