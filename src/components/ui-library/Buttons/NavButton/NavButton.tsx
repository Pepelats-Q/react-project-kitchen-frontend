import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './NavButton.module.scss';

type TPropsNavButton = {
  children?: React.ReactNode;
  className?: string;
  icon?: any;
  to: string;
  exact?: boolean;
  type?: string;
  onClick?: () => void;
};

const NavButton: FC<TPropsNavButton> = ({
  icon,
  to = '/',
  exact = true,
  className = '',
  children = 'Кнопка',
  type = 'navigation',
  onClick = () => {},
}) => {
  const types: { [key: string]: string } = {
    primary: styles.primary,
    navigation: styles.navigation,
  };

  return (
    <NavLink
      activeClassName={styles.navigation_active}
      className={clsx(styles.button, types[type] ? types[type] : styles.navigation, className)}
      exact={exact}
      onClick={onClick}
      to={to}
    >
      {icon && icon}
      <span>{children}</span>
    </NavLink>
  );
};

export default NavButton;
