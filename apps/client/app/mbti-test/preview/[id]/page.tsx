import { getMbtiTestCommentData, getMbtiTestData } from '@/services';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

export default async function Page({ params }: RouteMbtiTest.pageProp) {
  const mbtiTestData = await getMbtiTestData(params.id);
  const mbtiTestCommentData = await getMbtiTestCommentData(params.id);

  return (
    <PreviewMbtiTest mbtiTestData={mbtiTestData?.dataList.test} mbtiTestCommentData={mbtiTestCommentData?.dataList} />
  );
}
