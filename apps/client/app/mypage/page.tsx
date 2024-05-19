import { Suspense } from 'react';

import MyPage from '@/containers/MyPage';

export default function Page() {
  return (
    <Suspense>
      <MyPage />
    </Suspense>
  );
}
