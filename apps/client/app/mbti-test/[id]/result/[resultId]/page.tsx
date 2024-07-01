import { fetchData } from '@/services';
import { MbtiResult } from '@/types';

import MbtiTestResult from '@/containers/MbtiTestResult';

export default async function Page({ params }: { params: { id: string; resultId: string } }) {
  const mbtiTestResultData = await fetchData<MbtiResult>(
    `/api/v1/tests/test/test-result/${params.id}/${params.resultId}`,
    'GET',
  );

  return <MbtiTestResult mbtiTestResultData={mbtiTestResultData!} />;
}
