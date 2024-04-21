import { fetchClient } from '@/services';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

async function getData(url: RouteMbtiTest.getMbtiTestDataProp) {
  const fetchOption = {
    url: url,
    method: 'GET',
  };
  return fetchClient(fetchOption);
}

export default async function Page({ params }: RouteMbtiTest.pageProp) {
  const mbtiTestData = await getData(`/api/v1/tests/test/${params.id}`).then((response) => response?.dataList);
  const mbtiTestCommentData = await getData(`/api/v1/test/comments/${params.id}`).then(
    (response) => response?.dataList,
  );

  return <PreviewMbtiTest mbtiTestData={mbtiTestData} mbtiTestCommentData={mbtiTestCommentData} />;
}
