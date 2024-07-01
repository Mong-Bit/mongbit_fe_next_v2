import { getMbtiTestListAPI } from '@/services';

import ViewMbtiTest from '@/containers/ViewMbtiTest';

export default async function Page(): Promise<React.ReactNode> {
  const data = await getMbtiTestListAPI(5);
  return <ViewMbtiTest data={data.data} isViewTotal={false} />;
}
