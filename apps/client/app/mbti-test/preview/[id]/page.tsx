import { fetchClient } from '@/services';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

async function getData(url: string) {
  const fetchOption = {
    url: url,
    method: 'GET',
  };
  return fetchClient(fetchOption);
}

export default async function Page({ params }: RouteMbtiTest.pageProp) {
  const mbtiTestData = await getData(`/api/v1/tests/test/${params.id}`);
  const mbtiTestCommentData = await getData(`/api/v1/test/comments/${params.id}`);

  return (
    <PreviewMbtiTest mbtiTestData={mbtiTestData?.dataList.test} mbtiTestCommentData={mbtiTestCommentData?.dataList} />
  );
}
