import { notFound } from 'next/navigation';

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

const doApi = async ({ url, method, headers, body }: Services.FetchClientProp) => {
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
export const getMbtiTestCommentData = (testId: string) =>
  doApi({ url: `/api/v1/test/comments/${testId}`, method: 'GET' });

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

export const getAllCommentData = (testId: string | null) =>
  doApi({ url: `/api/v1/test/comments/${testId}`, method: 'GET' });

export const updateComment = (headers: Services.Headers, body: any) =>
  doApi({ url: `/api/v1/test/comments`, method: 'PATCH', headers, body });
