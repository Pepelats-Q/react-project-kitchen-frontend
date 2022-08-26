import React, { FC } from 'react';
import styles from './Tabs.module.scss';

type TTabsProps = {
  tab1: React.ReactNode;
  tab2: React.ReactNode;
};

const Tabs: FC<TTabsProps> = ({ tab1, tab2 }) => (
  <div className='articles-toggle'>
    {' '}
    <ul className={styles.tabsList}>
      <li className={`${styles.navItem}`}>{tab1}</li>
      <li className={`${styles.navItem}`}>{tab2}</li>
    </ul>
  </div>
);

export default Tabs;
