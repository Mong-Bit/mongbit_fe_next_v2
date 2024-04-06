'use client';

import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Flex, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Link from 'next/link';
import React from 'react';

import { Paths } from '@/constants/paths';

import styles from './index.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: 'dashboard', label: <Link href={Paths.home}>Dashboard</Link>, icon: <PieChartOutlined /> },
  { key: 'Contents', label: <Link href={Paths.contents}>Contents</Link>, icon: <DesktopOutlined /> },
];

const Navigation = () => (
  <Sider collapsible>
    <div className={styles.logoWrap}>
      <Flex vertical justify="space-between" align="center" className={styles.logoFlex}>
        <h2 className={styles.logoTitle}>MongBit</h2>
        <p>Admin</p>
      </Flex>
    </div>
    <Menu theme="dark" mode="inline" items={items} />
  </Sider>
);

export default Navigation;
