import PreviewMbtiTest from '@/containers/previewMbtiTest';

import { getRandomMbtiTestData } from '@/services';

export default async function Page() {
  const randomTestData = await getRandomMbtiTestData();

  return <PreviewMbtiTest mbtiTestData={randomTestData?.dataList} />;
}
