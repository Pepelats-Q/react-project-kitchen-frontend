import { FC } from 'react';
import useTranslate from '../../hooks/useTranslate';
import styles from './notLoadedApp.module.scss';

const NotLoadedApp: FC = () => {
  const localization = useTranslate();
  return (
    <div className={styles.page}>
      <div>
        <p className={styles.par}>{localization({ page: 'common', key: 'appNotLoaded' })}</p>
      </div>
    </div>
  );
};

export default NotLoadedApp;
