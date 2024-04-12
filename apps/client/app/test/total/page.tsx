import { fetchClient } from '@/services';

import ViewTotalMbtiTest from '@/containers/viewTotalMbtiTest';

async function getData() {
  const fetchOption = {
    url: '/api/v1/tests/0/10',
    method: 'GET',
  };
  return fetchClient(fetchOption);
}

export default async function Page(): Promise<React.ReactNode> {
  const data = await getData();
  return <ViewTotalMbtiTest data={data} />;
}
