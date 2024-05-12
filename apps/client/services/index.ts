import { notFound } from 'next/navigation';
export * from './util';
export * from './kakao';
export * from './like';
export * from './mbti';

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

  return response.json() as T;
};

// 기존
export const fetchClient = async ({ url, method, headers, body }: Services.FetchClientProp) => {
  const isInvaildUrl = !url || typeof url !== 'string';
  if (isInvaildUrl) throw new Error('Invalid URL');

  const requestOption = {
    method,
    headers: headers ?? {},
    body: body ?? null,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL_PROD}${url}`, requestOption);
  if (!res.ok) {
    switch (res.status) {
      case 404:
        return notFound();
      case 401:
        return;
      default:
        throw new Error('Failed to fetch data');
    }
  }

  if (res.status === 204) return;

  const dataList = await res.json();

  return { dataList, headers: res.headers };
};

export const doApi = async ({ url, method, headers, body }: Services.FetchClientProp) => {
  const fetchOption = {
    url,
    method,
    headers,
    body: JSON.stringify(body),
  };
  return fetchClient(fetchOption);
};

// api 요청 목록
export const getMbtiTestData = (testId: string) => doApi({ url: `/api/v1/tests/test/${testId}`, method: 'GET' });
export const getLatestMbtiTestData = (count: number) => doApi({ url: `/api/v1/tests/0/${count}`, method: 'GET' });
export const getAllMbtiTestData = (count: number) => doApi({ url: `/api/v1/tests/0/${count}`, method: 'GET' });
export const getMbtiTestCommentData = (testId: string | null, page: number) =>
  doApi({ url: `/api/v1/test/comments/${testId}/page/${page}`, method: 'GET' });

export const getLikeState = (testId: string | null, memberId: string | undefined) =>
  doApi({ url: `/api/v1/test/${testId}/${memberId}/like`, method: 'GET' });

export const updateLikeCount = (
  testId: string | null,
  memberId: string | undefined,
  likeState: boolean,
  headers: Services.Headers,
) => doApi({ url: `/api/v1/test/${testId}/${memberId}/like`, method: likeState ? 'DELETE' : 'POST', headers });

export const submitComment = (headers: Services.Headers, body: any) =>
  doApi({ url: `/api/v1/test/comments`, method: 'POST', headers, body });

export const updateComment = (headers: Services.Headers, body: any) =>
  doApi({ url: `/api/v1/test/comments`, method: 'PATCH', headers, body });

export const deleteComment = (headers: Services.Headers, body: any) =>
  doApi({ url: `/api/v1/test/comments`, method: 'DELETE', headers, body });

export const getRandomMbtiTestData = () => doApi({ url: `/api/v1/tests/random`, method: 'GET' });
