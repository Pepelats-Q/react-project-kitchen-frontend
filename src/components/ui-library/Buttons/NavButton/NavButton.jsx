import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './NavButton.module.scss';

const NavButton = ({
  icon,
  image,
  to = '/',
  exact = true,
  className = '',
  children = 'Кнопка',
  type = 'navigation',
}) => {
  const types = {
    primary: styles.primary,
    navigation: styles.navigation,
    tab: styles.tab,
  };

  const activeTypes = {
    primary: styles.primary_active,
    navigation: styles.navigation_active,
    tab: styles.tab_active,
  };

  return (
    <NavLink
      activeClassName={activeTypes[type] ? activeTypes[type] : styles.navigation_active}
      className={clsx(styles.button, types[type] ? types[type] : styles.navigation, className)}
      exact={exact}
      to={to}
    >
      {icon && <icon.type />}
      {image && <img alt={children} className={clsx(styles.image, className)} src={image} />}
      <span>{children}</span>
    </NavLink>
  );
};

NavButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  exact: PropTypes.bool,
  icon: PropTypes.node,
  image: PropTypes.node,
  to: PropTypes.string,
  type: PropTypes.string,
};

export default NavButton;
