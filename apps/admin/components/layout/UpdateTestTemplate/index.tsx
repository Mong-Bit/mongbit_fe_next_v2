'use client';
import cx from 'classnames';

import styles from './index.module.scss';

export default function UpdateTestInfoTemplate({ children }: React.PropsWithChildren) {
  return (
    <div className={cx(styles.wrap, 'gray')}>
      <h2 className={styles.testInfoTitle}> Add Content Info </h2>
      <div className={styles.TestContents}>{children}</div>
    </div>
  );
}
