import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './NavButton.module.scss';

const NavButton = ({ icon, to = '/', exact = true, className = '', children = 'Кнопка' }) => (
  <NavLink
    activeClassName={styles.navigation_active}
    className={clsx(styles.button, styles.navigation, className)}
    exact={exact}
    to={to}
  >
    {icon && <icon.type />}
    <span>{children}</span>
  </NavLink>
);

NavButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  exact: PropTypes.bool,
  icon: PropTypes.node,
  to: PropTypes.string,
};

export default NavButton;
