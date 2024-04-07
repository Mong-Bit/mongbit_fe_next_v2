import { Suspense } from 'react';

import KakaoAuthHandle from '@/containers/kakaoAuthHandle';

export default function Page() {
  return (
    <Suspense>
      <KakaoAuthHandle />
    </Suspense>
  );
}
