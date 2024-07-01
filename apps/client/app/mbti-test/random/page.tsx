import { getRandomMbtiTestAPI } from '@/services';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

export default async function Page() {
  const randomTestData = await getRandomMbtiTestAPI();
  return <PreviewMbtiTest mbtiTestData={randomTestData?.data.dataList} />;
}
