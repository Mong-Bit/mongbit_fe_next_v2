import { notFound } from 'next/navigation';

export const fetchClient = async ({ url, method, headers }: Services.FetchClientProp) => {
  const isInvaildUrl = !url || typeof url !== 'string';
  if (isInvaildUrl) throw new Error('Invalid URL');

  const requestOption = {
    method,
    headers: headers ?? {},
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL_PROD}${url}`, requestOption);
  if (!res.ok) {
    switch (res.status) {
      case 404:
        return notFound();
      default:
        throw new Error('Failed to fetch data');
    }
  }

  if (res.status === 204) return;

  const dataList = await res.json();

  return { dataList, headers: res.headers };
};
