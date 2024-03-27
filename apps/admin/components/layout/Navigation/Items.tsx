import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import Link from 'next/link';

import { Paths } from '@/constants/paths';

type MenuItem = Required<MenuProps>['items'][number];

// const items: MenuItem[] = [
//   getItem(<Link href="/">Dashboard</Link>, '1', <PieChartOutlined />),
//   getItem('Contents', 'sub1', <DesktopOutlined />, [
//     getItem(<Link href="/contents">List</Link>, '2'),
//     getItem(<Link href="/contents/detalis">Detalis</Link>, '3'),
//   ]),
//   getItem('Members', 'sub2', <UserOutlined />, [
//     getItem(<Link href="/">List</Link>, '4'),
//     getItem(<Link href="/">Detalis</Link>, '5'),
//   ]),
//   getItem(<Link href="/">Team</Link>, '6', <TeamOutlined />),
// ];

// TODO: 풀어서 쓰기
const items: MenuItem[] = [
  { key: 'dashboard', label: <Link href={Paths.home}>Dashboard</Link>, icon: <PieChartOutlined /> },
  { key: 'Contents', label: <Link href={Paths.contents}>Contents</Link>, icon: <DesktopOutlined /> },
];

export default items;
