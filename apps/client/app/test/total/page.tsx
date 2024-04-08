import ViewTotalMbtiTest from '@/containers/viewTotalMbtiTest';
import { fetchClient } from '@/services';

async function getData() {
  const fetchProp = {
    url: '/api/v1/tests/0/10',
    method: 'GET',
  };
  return fetchClient(fetchProp);
}

export default async function Page(): Promise<React.ReactNode> {
  const data = await getData();
  return <ViewTotalMbtiTest data={data} />;
}
