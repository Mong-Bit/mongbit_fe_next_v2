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

apiBe_v1.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  },
);

apiBe_v2.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  },
);
