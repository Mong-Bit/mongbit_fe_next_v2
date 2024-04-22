import { Spin } from 'antd';
import { Suspense } from 'react';

import KaKaoAuthHandle from '@/containers/KakaoLogin/KakaoAuthHandle';

export default async function Page() {
  return (
    <Suspense fallback={<Spin />}>
      <KaKaoAuthHandle />;
    </Suspense>
  );
}
