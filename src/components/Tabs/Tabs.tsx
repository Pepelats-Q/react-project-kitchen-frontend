import { FC } from 'react';
import { TTabsProps } from '../../utils/typesTs';
import TabButton from '../ui-library/Buttons/TabButton/TabButton';
import styles from './Tabs.module.scss';

const Tabs: FC<TTabsProps> = ({ tabsNames, handleClicks, currentTabFlag }) => (
  <div className='articles-toggle'>
    <ul className={styles.tabsList}>
      {tabsNames.map((tabName, index) => (
        <li key={tabName.name} className={`${styles.navItem}`}>
          <TabButton
            isCurrent={currentTabFlag === tabName.flag}
            name={tabName.name}
            onClick={handleClicks[index]}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default Tabs;
