'use client';

import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Card, Flex, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { PATHS } from '@/constants/paths';
import { isDarkModeState } from '@/states/darkModeState';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: 'dashboard', label: <Link href={PATHS.dashboard}>Dashboard</Link>, icon: <PieChartOutlined /> },
  { key: 'Contents', label: <Link href={PATHS.contents}>Contents</Link>, icon: <DesktopOutlined /> },
];

const Navigation = () => {
  const isDarkMode = useRecoilValue(isDarkModeState);
  const router = useRouter();

  return (
    <Sider theme={isDarkMode ? 'dark' : 'light'}>
      <Flex justify="center" align="center" style={{ padding: 20 }}>
        <Card style={{ width: '100%' }} hoverable onClick={() => router.push(PATHS.dashboard)}>
          <h2 style={{ fontSize: 15 }}>MongBit</h2>
          <p>Admin</p>
        </Card>
      </Flex>
      <Menu theme={isDarkMode ? 'dark' : 'light'} mode="inline" items={items} />
    </Sider>
  );
};

export default Navigation;
