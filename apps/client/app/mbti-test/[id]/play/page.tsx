import { getMbtiTestAPI } from '@/services';

import OnMbtiTest from '@/containers/onMbtiTest';

export default async function Page({ params }) {
  const mbtiTestData = await getMbtiTestAPI(params.id);

  return <OnMbtiTest data={mbtiTestData.data.test} />;
}
h;
