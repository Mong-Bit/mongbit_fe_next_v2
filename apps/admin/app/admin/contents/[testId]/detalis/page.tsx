import { DOMAIN_BE_PROD } from '@/constants/domain';
import { MbtiTestCover } from '@/types/contents';
import { getHeaders_ssr } from '@/utils/utils_ssr';

import ContenDetalis from '@/containers/ContentDetalis';

interface Props {
  params: {
    testId: string;
  };
}

export default async function Page({ params: { testId } }: Props) {
  const headers = getHeaders_ssr();
  const testData = await fetch(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`, { headers }).then(
    (res) => res.json() as Promise<MbtiTestCover>,
  );

  return <ContenDetalis testData={testData} />;
}