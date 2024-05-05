import MbtiTestResult from '@/containers/MbtiTestResult';

import { doApi } from '@/services';

export default async function Page({ params }: { params: { testId: string; resultId: string } }) {
  const mbtiTestResultData = await doApi({
    url: `/api/v1/tests/test/test-result/${params.testId}/${params.resultId}`,
    method: 'GET',
  });

  return <MbtiTestResult mbtiTestResultData={mbtiTestResultData?.dataList} />;
}
