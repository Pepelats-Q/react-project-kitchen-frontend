import { FC } from 'react';
import { TNames } from '../../utils/types';
import TabButton from '../ui-library/Buttons/TabButton/TabButton';
import styles from './Tabs.module.scss';

type TTabsProps = {
  tabsNames: Array<TNames>;
};

const Tabs: FC<TTabsProps> = ({ tabsNames }) => (
  <div className='articles-toggle'>
    <div className={styles.tabsList}>
      {tabsNames.map((tabName) => (
        <TabButton key={tabName.name} text={tabName.name} to={tabName.path} />
      ))}
    </div>
  </div>
);

export default Tabs;
