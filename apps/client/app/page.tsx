import { getLatestMbtiTestData } from '@/services';

import Main from '@/containers/main';

export default async function Home(): Promise<React.ReactNode> {
  const latestMbtiTestData = await getLatestMbtiTestData(6);

  return <Main data={latestMbtiTestData?.dataList} />;
}
