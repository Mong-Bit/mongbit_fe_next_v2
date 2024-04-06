'use client';

import { LinkOutlined } from '@ant-design/icons';
import { Flex, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import { CLIENT_DOMAIN } from '@/constants/domain';
import { userState } from '@/states/userState';

import styles from './index.module.scss';

export default function AdminHeader() {
  const userinfo = useRecoilValue(userState);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Header style={{ paddingRight: 20, background: borderRadiusLG }}>
      <Flex justify="flex-end">
        <Flex justify="space-between" align="center" className={styles.headerWrap}>
          <Link href={CLIENT_DOMAIN}>
            몽빗 이동하기
            <LinkOutlined className={styles.linkIcon} />
          </Link>
          <Flex justify="space-between" align="center" className={styles.userWrap}>
            <span className="red">Admin</span>
            <p>
              {userinfo.username}
              <span>님</span>
            </p>
            <button className={styles.logoutBtn}>
              <div className={styles.logoutImg} />
            </button>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
}
