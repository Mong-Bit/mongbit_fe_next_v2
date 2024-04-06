import '../styles/globals.scss';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import Layout, { Content, Footer } from 'antd/es/layout/layout';

import AdminHeader from '@/components/layout/AdminHeader';
import Navigation from '@/components/layout/Navigation/Index';
import RecoilRootProvider from '@/components/layout/RecoilRootProvider';

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
          <ConfigProvider>
            <Layout style={{ minHeight: '100vh' }}>
              <Navigation />
              <Layout>
                <AdminHeader />
                <Content style={{ margin: '20px 16px 0', minHeight: 500, minWidth: 1000 }}>{children}</Content>
                <Footer style={{ textAlign: 'center' }}>© 2023 MongMoongCrew. All rights reserved</Footer>
              </Layout>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </RecoilRootProvider>
    </body>
  </html>
);

export default RootLayout;
