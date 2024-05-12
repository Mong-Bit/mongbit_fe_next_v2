import { getMbtiTestData } from '@/services';

import OnMbtiTest from '@/containers/onMbtiTest';

export default async function Page({ params }) {
  const mbtiTestData = await getMbtiTestData(params.id);

  return <OnMbtiTest data={mbtiTestData?.dataList.test} />;
}
