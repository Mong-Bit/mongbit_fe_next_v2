import '../styles/globals.scss';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import { DOMAIN } from '@/constants/domain';

import AntdProvider from '@/components/layout/AntdProvider';
import RecoilRootProvider from '@/components/layout/RecoilRootProvider';

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: '몽빗[ADMIN]',
  description: '심리테스트 플랫폼 몽빗의 Back Office 입니다',
  icons: {
    icon: '/favicon.ico',
  },
};

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
    <body className={notoSansKr.className}>
      <RecoilRootProvider>
        <AntdRegistry>
          <AntdProvider>{children}</AntdProvider>
        </AntdRegistry>
      </RecoilRootProvider>
    </body>
  </html>
);

export default RootLayout;
