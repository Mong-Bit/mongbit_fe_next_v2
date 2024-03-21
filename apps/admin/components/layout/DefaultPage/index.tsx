import styles from './index.module.scss';

const DefaultPage: React.FC<{ text: string }> = ({ text }) => (
  <div className={styles.wrap}>
    <p>{text}</p>
  </div>
);

export default DefaultPage;
