import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import '../styles/globals.scss';
import RecoilRootProvider from '@/components/layout/RecoilRootProvider';
import Navigation from '@/components/layout/Navigation/Index';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <head>
      <script
        async
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.js"
        integrity="sha384-9Fs/wd1UNwjbBTnEsUvebAW7kzBWEOjRAXJvbaV+w+5kG1WXNXOui+4QV1KcRixH"
        crossOrigin="anonymous"
      />
    </head>
    <body>
      <RecoilRootProvider>
        <AntdRegistry>
          <Navigation>{children}</Navigation>
        </AntdRegistry>
      </RecoilRootProvider>
    </body>
  </html>
);

export default RootLayout;
