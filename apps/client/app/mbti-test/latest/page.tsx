import { getLatestMbtiTestData } from '@/services';

import ViewMbtiTest from '@/containers/ViewMbtiTest';

export default async function Page(): Promise<React.ReactNode> {
  const data = await getLatestMbtiTestData(5);
  return <ViewMbtiTest data={data?.dataList} isViewTotal={false} />;
}
