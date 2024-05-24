import { notFound } from 'next/navigation';

import { LOGIN } from '@/constants/constant';

interface CreateHeadersProrps {
  contnetType?: string;
  cacheControl?: string;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
  headers: Headers;
  body: string;
  params: object;
  method: Method;
}

interface FetchOptionProps extends Omit<FetchOptions, 'body' | 'method'> {
  body: { [key: string]: any };
}

export const createHeaders = (headerAppend?: CreateHeadersProrps) => {
  const { contnetType, cacheControl } = headerAppend ?? {};
  const headers = new Headers();

  if (typeof sessionStorage === 'undefined') return;

  const loginData = sessionStorage.getItem(LOGIN.MONGBIT);
  const token = loginData ? JSON.parse(loginData).recoil_login[LOGIN.TOKEN_NAME] : '';

  headers.append('Content-Type', contnetType || 'application/json');
  headers.append('Cache-Control', cacheControl || 'public');
  headers.append('Authorization', token);

  return headers;
};

export const fetchData = async <T>(url: string, method: Method, options?: Partial<FetchOptionProps>) => {
  const { body, ...restOptions } = options ?? {};
  const fetchOptions = {
    method,
    ...restOptions,
    ...(body ? { body: JSON.stringify(body) } : undefined),
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL_PROD}${url}`, fetchOptions);

  if (!response.ok) {
    switch (response.status) {
      case 404:
        return notFound();
      case 401:
        return;
      default:
        throw new Error('Failed to fetch data');
    }
  }

  if (response.status === 204) return;

  const data = await response.json();

  return {
    data,
    headers: response.headers,
  } as T;
};
