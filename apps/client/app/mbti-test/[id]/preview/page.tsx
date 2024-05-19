import { getMbtiTestData } from '@/services';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

export default async function Page({ params }: Route.MbtiTestPreviewProp) {
  const mbtiTestData = await getMbtiTestData(params.id);

  return <PreviewMbtiTest mbtiTestData={mbtiTestData?.dataList} />;
}
