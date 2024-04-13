import { DOMAIN_BE_PROD } from '@/constants/domain';
import { MbtiTest } from '@/types/contents';
import { getHeaders } from '@/utils/utils';

import ContenDetalis from '@/containers/ContentDetalis';

interface Props {
  params: {
    testId: string;
  };
}
export default async function Page({ params: { testId } }: Props) {
  const headers = getHeaders();
  const testData = await fetch(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`, { headers }).then(
    (res) => res.json() as Promise<MbtiTest>,
  );
  return <ContenDetalis testData={testData} />;
}
