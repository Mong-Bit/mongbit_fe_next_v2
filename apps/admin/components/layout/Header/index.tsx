import Link from 'next/link';
import { LinkOutlined } from '@ant-design/icons';

import { CLIENT_DOMAIN } from '@/constants/constant';

import styles from './index.module.scss';

export default function Header() {
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
          <p>
            [닉네임]<span className={styles.sp_2}>님</span>
          </p>
          <button className={styles.logoutBtn}></button>
        </div>
      </div>
    </header>
  );
}
