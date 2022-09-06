import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './NavButton.module.scss';

const NavButton = ({
  icon,
  to = '/',
  exact = true,
  className = '',
  children = 'Кнопка',
  type = 'navigation',
}) => {
  const types = {
    primary: styles.primary,
    navigation: styles.navigation,
  };

  const { alt, src } = icon.props;
  const imageToShow =
    icon.type === 'img' ? <img alt={alt} className={styles.image} src={src} /> : <icon.type />;

  return (
    <NavLink
      activeClassName={styles.navigation_active}
      className={clsx(styles.button, types[type] ? types[type] : styles.navigation, className)}
      exact={exact}
      to={to}
    >
      {icon && imageToShow}
      <span>{children}</span>
    </NavLink>
  );
};

NavButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  exact: PropTypes.bool,
  icon: PropTypes.node,
  to: PropTypes.string,
  type: PropTypes.string,
};

export default NavButton;
