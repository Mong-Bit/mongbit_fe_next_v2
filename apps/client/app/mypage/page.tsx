import { Suspense } from 'react';

import ViewMyPage from '@/containers/viewMyPage';

export default function Page() {
  return (
    <Suspense fallback={<p>Loding...</p>}>
      <ViewMyPage />
    </Suspense>
  );
}
