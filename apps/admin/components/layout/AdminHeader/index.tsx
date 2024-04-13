'use client';

import { LinkOutlined } from '@ant-design/icons';
import { Flex, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { TOKEN_NAME, USER } from '@/constants/constant';
import { CLIENT_DOMAIN } from '@/constants/domain';
import { Paths } from '@/constants/paths';
import { userState } from '@/states/userState';
import SessionStorage from '@/utils/sessionStorage';
import { decodeToken } from '@/utils/utils';

import styles from './index.module.scss';

export default function AdminHeader() {
  const [user, setUser] = useState<{ name: string; role?: string }>();
  const userinfo = useRecoilValue(userState);
  const token = decodeToken();
  const router = useRouter();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const onClickLogoutBtn = () => {
    SessionStorage.removeItem(TOKEN_NAME);
    SessionStorage.removeItem(USER);
    router.push(Paths.login);  };

  useEffect(() => {
    if (token.state) {
      setUser({
        name: userinfo.username,
        role: token.role,
      });
    }
  }, [userinfo]);

  return (
    <Header style={{ paddingRight: 20, background: borderRadiusLG }}>
      <Flex justify="flex-end">
        <Flex justify="space-between" align="center" className={styles.headerWrap}>
          <Link href={CLIENT_DOMAIN}>
            몽빗 이동하기
            <LinkOutlined className={styles.linkIcon} />
          </Link>
          <Flex justify="space-around" align="center" className={styles.userWrap}>
            <span className="red">{user && user.role === 'ROLE_ADMIN' ? 'Admin' : ''}</span>
            <p>
              {user ? user.name : ''}
              <span>님</span>
            </p>
          </Flex>
          <button className={styles.logoutBtn} onClick={onClickLogoutBtn}>
            <div className={styles.logoutImg} />
          </button>
        </Flex>
      </Flex>
    </Header>
  );
}
