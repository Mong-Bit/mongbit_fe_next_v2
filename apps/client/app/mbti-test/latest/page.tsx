import { getLatestMbtiTestData } from '@/services';

import ViewLatestMbtiTest from '@/containers/viewLatestMbtiTest';

export default async function Page(): Promise<React.ReactNode> {
  const data = await getLatestMbtiTestData(5);
  return <ViewLatestMbtiTest data={data} />;
}
