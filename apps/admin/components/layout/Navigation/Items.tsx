import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import Link from 'next/link';

import { Paths } from '@/constants/paths';

type MenuItem = Required<MenuProps>['items'][number];

// TODO: 풀어서 쓰기
const items: MenuItem[] = [
  { key: 'dashboard', label: <Link href={Paths.home}>Dashboard</Link>, icon: <PieChartOutlined /> },
  { key: 'Contents', label: <Link href={Paths.contents}>Contents</Link>, icon: <DesktopOutlined /> },
];

export default items;
