import { FC } from 'react';
import { TTabsProps } from '../../utils/typesComponentProps';
import TabButton from '../ui-library/Buttons/TabButton/TabButton';
import styles from './Tabs.module.scss';

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
