'use client';

import { useRouter } from 'next/navigation';
import cx from 'classnames';

import styles from './index.module.scss';

export const SubmitBtn: React.FC = () => (
  <div className={styles.wrap}>
    <input type="submit" value="다음" className={cx(styles.submitBtn, styles.btn_blue, 'back_shadow')} />
  </div>
);

export const PrevButton: React.FC = () => {
  const router = useRouter();
  const handleButton = () => {
    router.back();
  };
  return (
    <div className={styles.wrap}>
      <button onClick={handleButton} className={cx(styles.submitBtn, styles.btn_blue, 'back_shadow')}>
        이전
      </button>
    </div>
  );
};

export const SaveButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className={styles.wrap}>
    <button onClick={onClick} className={cx(styles.submitBtn, styles.btn_orange, 'back_shadow')}>
      저장
    </button>
  </div>
);
