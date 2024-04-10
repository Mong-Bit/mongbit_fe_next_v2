import Main from '@/containers/main';
import { fetchClient } from '@/services';

async function getData() {
  const fetchOption = {
    url: '/api/v1/tests/0/6',
    method: 'GET',
  };
  return fetchClient(fetchOption);
}

export default async function Home(): Promise<React.ReactNode> {
  const data = await getData();

  return <Main data={data} />;
}
