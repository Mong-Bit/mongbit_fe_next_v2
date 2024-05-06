import '../../styles/globals.scss';
import Layout, { Content, Footer } from 'antd/es/layout/layout';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import { ROLE_USER } from '@/constants/constant';
import { decodeToken_ssr } from '@/utils/utils_ssr';

import Error from './error';
import AdminHeader from '@/components/layout/AdminHeader';
import DarkModeProvider from '@/components/layout/DarkModeProvider';
import Navigation from '@/components/layout/Navigation/Index';
import AccessDeniedPage from '@/components/lib/antd/AccessDeniedPage';

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const token = decodeToken_ssr();

  if (token.role === ROLE_USER) return <AccessDeniedPage type={403} />;

  return (
    <DarkModeProvider>
      <Layout style={{ minHeight: '100vh', minWidth: 1100 }}>
        <Navigation />
        <Layout>
          <AdminHeader />
          <Content style={{ margin: '20px 16px 0', minHeight: 500, minWidth: 700 }}>
            <ErrorBoundary errorComponent={Error}>{children}</ErrorBoundary>
          </Content>
          <Footer style={{ textAlign: 'center', margin: 40 }}>© 2023 MongMoongCrew. All rights reserved</Footer>
        </Layout>
      </Layout>
    </DarkModeProvider>
  );
};

export default RootLayout;
