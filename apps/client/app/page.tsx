import { getMbtiTestListAPI } from '@/services';

import Main from '@/containers/main';

export default async function Home(): Promise<React.ReactNode> {
  const latestMbtiTestData = await getMbtiTestListAPI(6);

  return <Main data={latestMbtiTestData.data} />;
}
