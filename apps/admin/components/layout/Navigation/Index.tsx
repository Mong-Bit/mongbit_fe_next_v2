'use client';

import React, { ReactNode, useState } from 'react';
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from 'next/link';

import type { MenuProps } from 'antd';

import styles from './index.module.scss';
import HeaderComponent from '../Header';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem('Contents', 'sub1', <DesktopOutlined />, [
    getItem(<Link href="/contents">List</Link>, '2'),
    getItem(<Link href="/">Detalis</Link>, '3'),
  ]),
  getItem('Members', 'sub2', <UserOutlined />, [
    getItem(<Link href="/">List</Link>, '4'),
    getItem(<Link href="/">Detalis</Link>, '5'),
  ]),
  getItem('Team', 'sub3', <TeamOutlined />, [getItem('관리자 1', '6'), getItem('관리자 2', '7')]),
];

const Navigation: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        // theme='light'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          // defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout style={{ minWidth: 800 }}>
        <Header className={styles.headerWarp} style={{ padding: 0, background: borderRadiusLG }}>
          <div className={styles.logoWarp}>로고입니당</div>
          <div className={styles.headerBox}>
            <HeaderComponent />
          </div>
        </Header>
        <Content style={{ margin: '10px 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: '링크' }, { title: '어케넣냐' }]} />
          <div
            style={{
              padding: 24,
              minWidth: 700,
              minHeight: 360,
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
