import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { TTabButtonProps } from '../../../../utils/typesTs';

import styles from './TabButton.module.scss';

const TabButton: FC<TTabButtonProps> = ({
  to = '/',
  exact = true,
  className = '',
  text = 'Вкладка',
}) => (
  <NavLink
    activeClassName={styles.tab_active}
    className={clsx(styles.tab, className)}
    exact={exact}
    to={to}
  >
    {text}
  </NavLink>
);

export default TabButton;
