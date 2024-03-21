import { MenuProps } from 'antd';
import Link from 'next/link';
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

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
    getItem(<Link href="/contents/list">List</Link>, '2'),
    getItem(<Link href="/">Detalis</Link>, '3'),
  ]),
  getItem('Members', 'sub2', <UserOutlined />, [
    getItem(<Link href="/">List</Link>, '4'),
    getItem(<Link href="/">Detalis</Link>, '5'),
  ]),
  getItem('Team', 'sub3', <TeamOutlined />, [getItem('관리자 1', '6'), getItem('관리자 2', '7')]),
];

export default items;
