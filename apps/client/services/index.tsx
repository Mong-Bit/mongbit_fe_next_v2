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

export const getData = async (url: string, method: string) => {
  const fetchOption = {
    url,
    method,
  };
  return fetchClient(fetchOption);
};

// api 요청 목록
export const getMbtiTestData = (testId: string) => getData(`/api/v1/tests/test/${testId}`, 'GET');
export const getLatestMbtiTestData = (count: number) => getData(`/api/v1/tests/0/${count}`, 'GET');
export const getAllMbtiTestData = (count: number) => getData(`/api/v1/tests/0/${count}`, 'GET');
export const getMbtiTestCommentData = (testId: string) => getData(`/api/v1/test/comments/${testId}`, 'GET');
export const getRandomMbtiTestData = () => getData(`/api/v1/tests/random`, 'GET');
