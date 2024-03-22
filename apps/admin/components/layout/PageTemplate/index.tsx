'use client';
import cx from 'classnames';

import styles from './index.module.scss';

interface Props extends React.PropsWithChildren<{ title: string }> {
  title: string;
}

export default function PageTemplate({ children, title }: Props) {
  return (
    <div className={cx(styles.wrap, 'gray')}>
      <h2 className={styles.title}> {title} </h2>
      <div className={styles.contents}>{children}</div>
    </div>
  );
}
