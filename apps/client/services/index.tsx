import { notFound } from 'next/navigation';
import * as Types from '@/services/types';

export const fetchClient = async ({url, method, headers}: Types.FetchClientProp) => {
  const isInvaildUrl = !url || typeof url !== 'string';

  if (isInvaildUrl) throw new Error('Invalid URL');

  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL_PROD}${url}`);

  if (!res.ok) {
    switch (res.status) {
      case 404:
        return notFound();
      default:
        throw new Error('Failed to fetch data');
    }
  }

  return res.json();
};
