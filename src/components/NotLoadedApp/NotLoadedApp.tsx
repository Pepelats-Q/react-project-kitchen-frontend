import { FC } from 'react';
import styles from './notLoadedApp.module.scss';

const NotLoadedApp: FC = () => (
  <div className={styles.page}>
    <div>
      <p className={styles.par}>App couldnt load. Try again later</p>
    </div>
  </div>
);

export default NotLoadedApp;
