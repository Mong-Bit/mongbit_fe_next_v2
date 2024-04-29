'use client';

import { LinkOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Switch, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ROLE_ADMIN, TOKEN_NAME, USER } from '@/constants/constant';
import { CLIENT_DOMAIN } from '@/constants/domain';
import { PATHS } from '@/constants/paths';
import { isDarkModeState } from '@/states/darkModeState';
import { userState } from '@/states/userState';
import { removeCookie } from '@/utils/cookies';
import { decodeToken_csr } from '@/utils/utils';

import styles from './index.module.scss';

export default function AdminHeader() {
  const [user, setUser] = useState<{ name: string; role?: string }>();
  const userInfo = useRecoilValue(userState);
  const router = useRouter();
  const token = decodeToken_csr();
  const setIsDarkMode = useSetRecoilState(isDarkModeState);
  const isDarkMode = useRecoilValue(isDarkModeState);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const onClickLogoutBtn = () => {
    localStorage.removeItem(USER);
    removeCookie(TOKEN_NAME);
    router.replace(PATHS.login);
  };
  const onChangeMode = (checked: boolean) => {
    setIsDarkMode(checked);
  };
  useEffect(() => {
    if (token.state && token.role === ROLE_ADMIN) {
      setUser({
        name: userInfo.username,
        role: token.role,
      });
    } else {
      router.push(PATHS.login);
    }
  }, [userInfo]);

  return (
    <Header style={{ marginTop: 10, paddingRight: 20, background: borderRadiusLG }}>
      <Flex justify="space-between" align="center">
        <Switch checkedChildren="Dark" unCheckedChildren="Light" onChange={onChangeMode} defaultChecked={isDarkMode} />
        <Card size="small" style={{ width: 350, padding: '0 5px' }}>
          <Flex justify="space-between" align="center">
            <Link href={CLIENT_DOMAIN} className={styles.link} target="_blank" rel="noopener noreferrer">
              몽빗 이동하기
              <LinkOutlined className={styles.linkIcon} />
            </Link>
            <span className="red">{user && user.role === 'ROLE_ADMIN' ? 'Admin' : ''}</span>
            <p>
              {user ? user.name : ''}
              <span className={styles.userSpan}> 님</span>
            </p>
            <Button size="small" onClick={onClickLogoutBtn}>
              <div className={styles.logoutImg} />
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Header>
  );
}
