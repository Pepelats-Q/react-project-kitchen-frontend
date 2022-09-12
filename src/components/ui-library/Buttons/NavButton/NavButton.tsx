import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './NavButton.module.scss';
import { TPropsNavButton } from '../../../../utils/typesTs';

const NavButton: FC<TPropsNavButton> = ({
  icon,
  to = '/',
  exact = true,
  className = '',
  children = 'Кнопка',
  type = 'navigation',
}) => {
  const types: any = {
    primary: styles.primary,
    navigation: styles.navigation,
  };

  return (
    <NavLink
      activeClassName={styles.navigation_active}
      className={clsx(styles.button, types[type] ? types[type] : styles.navigation, className)}
      exact={exact}
      to={to}
    >
      {icon && <icon.type {...icon.props} />}
      <span>{children}</span>
    </NavLink>
  );
};

export default NavButton;
