import { fetchClient } from '@/services';

import ViewLatestMbtiTest from '@/containers/viewLatestMbtiTest';

async function getData() {
  const fetchOption = {
    url: '/api/v1/tests/0/5',
    method: 'GET',
  };
  return fetchClient(fetchOption);
}

export default async function Page(): Promise<React.ReactNode> {
  const data = await getData();
  return <ViewLatestMbtiTest data={data} />;
}