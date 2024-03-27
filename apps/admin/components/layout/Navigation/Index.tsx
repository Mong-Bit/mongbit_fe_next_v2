'use client';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import cx from 'classnames';
import React, { ReactNode, useState } from 'react';

import styles from './index.module.scss';
import items from './Items';
import HeaderComponent from '../Header';

const { Header, Content, Footer, Sider } = Layout;

const Navigation: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 10 }}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout className="min_wrap_w_size" style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header className={styles.headerWrap} style={{ background: borderRadiusLG }}>
          <div className={styles.logoWrap}>MongBit Admin</div>
          <div className={cx(styles.headerBox)}>
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
