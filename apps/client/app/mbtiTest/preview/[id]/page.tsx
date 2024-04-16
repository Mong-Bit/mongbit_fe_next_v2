import { fetchClient } from '@/services';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

async function getData(id: RouteMbtiTest.getDataProp) {
  const fetchOption = {
    url: `/api/v1/tests/test/${id}`,
    method: 'GET',
  };
  return fetchClient(fetchOption);
}

export default async function Page({ params }: RouteMbtiTest.pageProp) {
  const data = await getData(params.id).then((response) => response.dataList);

  return <PreviewMbtiTest data={data} />;
}
