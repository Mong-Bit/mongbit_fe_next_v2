'use client';

import React, { ReactNode, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import styles from './index.module.scss';
import HeaderComponent from '../Header';
import items from './Items';

const { Header, Content, Footer, Sider } = Layout;

const Navigation: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout style={{ minWidth: 800 }}>
        <Header className={styles.headerWrap} style={{ background: borderRadiusLG }}>
          <div className={styles.logoWrap}>MongBit Admin</div>
          <div className={styles.headerBox}>
            <HeaderComponent />
          </div>
        </Header>
        <Content style={{ margin: '10px 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div
            className={styles.contentsWrap}
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2023 MongMoongCrew. All rights reserved</Footer>
      </Layout>
    </Layout>
  );
};

export default Navigation;
