import { FC } from 'react';
import { TTabsProps } from '../../utils/typesTs';
import NavButton from '../ui-library/Buttons/NavButton/NavButton';
import styles from './Tabs.module.scss';

const Tabs: FC<TTabsProps> = ({ tabsNames }) => (
  <div className='articles-toggle'>
    <div className={styles.tabsList}>
      {tabsNames.map((tabName) => (
        <NavButton to={tabName.path} type='tab' key={tabName.name}>
          {tabName.name}
        </NavButton>
      ))}
    </div>
  </div>
);

export default Tabs;
