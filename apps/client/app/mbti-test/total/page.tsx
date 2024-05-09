import { getAllMbtiTestData } from '@/services';

import ViewMbtiTest from '@/containers/ViewMbtiTest';

export default async function Page(): Promise<React.ReactNode> {
  const data = await getAllMbtiTestData(10);

  return <ViewMbtiTest data={data?.dataList} isViewTotal={true} />;
}
