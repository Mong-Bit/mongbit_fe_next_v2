'use client';

import { LinkOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { CLIENT_DOMAIN } from '@/constants/domain';
import { userState } from '@/states/userState';

import styles from './index.module.scss';

export default function Header() {
  const userinfo = useRecoilValue(userState);
  const [userName, setUserName] = useState();
  useEffect(() => setUserName(userinfo.username), []);

  return (
    <header>
      <div className={styles.headerWrap}>
        <div className={styles.linkWrap}>
          <Link href={CLIENT_DOMAIN}>
            몽빗 이동하기
            <LinkOutlined className={styles.linkIcon} />
          </Link>
        </div>
        <div className={styles.userWrap}>
          <span className="red">Admin</span>
          {}
          <p>
            {userName}
            <span className={styles.sp_2}>님</span>
          </p>
          <button className={styles.logoutBtn}>
            <div className={styles.logoutImg} />
          </button>
        </div>
      </div>
    </header>
  );
}
