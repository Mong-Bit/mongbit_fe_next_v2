import { getAllMbtiTestData } from '@/services';

import ViewTotalMbtiTest from '@/containers/viewTotalMbtiTest';

export default async function Page(): Promise<React.ReactNode> {
  const data = await getAllMbtiTestData(10);
  return <ViewTotalMbtiTest data={data} />;
}
