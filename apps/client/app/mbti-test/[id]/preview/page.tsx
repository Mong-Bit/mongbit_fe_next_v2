import { getMbtiTestAPI } from '@/services';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

export default async function Page({ params }: Route.MbtiTestPreviewProp) {
  const mbtiTestData = await getMbtiTestAPI(params.id);

  return <PreviewMbtiTest mbtiTestData={mbtiTestData} />;
}
