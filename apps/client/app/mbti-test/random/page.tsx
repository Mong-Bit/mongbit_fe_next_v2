import { getRandomMbtiTestData } from '@/services';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

export default async function Page() {
  const randomTestData = await getRandomMbtiTestData();

  return <PreviewMbtiTest mbtiTestData={randomTestData?.dataList} />;
}
