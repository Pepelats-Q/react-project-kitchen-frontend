import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './NavButton.module.scss';
import { TPropsNavButton } from '../../../../utils/typesUI';

const NavButton: FC<TPropsNavButton & { onClick?: () => void }> = ({
  icon,
  to = '/',
  exact = true,
  className = '',
  children = 'Кнопка',
  type = 'navigation',
  onClick = () => {},
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
      onClick={onClick}
      to={to}
    >
      {/* TODO: убрать warn линтера на спред. Со спредом тут - самая краткая запись. Надо подумать, как еще можно сделать */}
      {icon && <icon.type {...icon.props} />}
      <span>{children}</span>
    </NavLink>
  );
};

export default NavButton;
