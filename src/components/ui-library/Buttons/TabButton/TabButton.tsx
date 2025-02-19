import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './TabButton.module.scss';

type TTabButtonProps = {
  to: string;
  exact?: boolean;
  className?: string;
  text: string;
};

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
