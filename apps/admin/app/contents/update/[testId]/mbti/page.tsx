import { DOMAIN_BE_PROD } from '@/constants/domain';

import UpdateTestInfoForm from '@/components/layout/UpdateTestInfoForm';

import { getHeaders } from '@/utils/utils';
import { MbtiTest } from '@/types/test';

export default async function Page({ params }: { params: { testId: string } }) {
  const headers = getHeaders();
  const testData = await fetch(`${DOMAIN_BE_PROD}/api/v1/tests/test/${params.testId}`, { headers }).then(
    (res) => res.json() as Promise<MbtiTest>,
  );
  return <UpdateTestInfoForm testData={testData} />;
}
