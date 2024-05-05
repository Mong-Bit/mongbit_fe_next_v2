import { notFound } from 'next/navigation';

import PreviewMbtiTest from '@/containers/previewMbtiTest';

import { getMbtiTestCommentData, getRandomMbtiTestData } from '@/services';

export default async function Page() {
  const randomTestData = await getRandomMbtiTestData();

  if (randomTestData) {
    const mbtiTestCommentData = await getMbtiTestCommentData(randomTestData!.dataList!.id);

    return (
      <PreviewMbtiTest mbtiTestData={randomTestData?.dataList} mbtiTestCommentData={mbtiTestCommentData?.dataList} />
    );
  }
  return notFound();
}
