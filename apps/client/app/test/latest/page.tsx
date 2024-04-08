import ViewLatestMbtiTest from '@/containers/viewLatestMbtiTest';
import { fetchClient } from '@/services';

async function getData() {
  const fetchProp = {
    url: '/api/v1/tests/0/5',
    method: 'GET',
  };
  return fetchClient(fetchProp);
}

export default async function Page(): Promise<React.ReactNode> {
  const data = await getData();
  return <ViewLatestMbtiTest data={data} />;
}
