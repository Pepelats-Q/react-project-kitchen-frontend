import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './header.module.scss';
import { TOGGLE_MOBILE_MENU } from '../../constants/actionTypes';

const MenuItem = ({ text, icon: Icon, path, isProfileIcon }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state) => state.header.isMobileMenuOpen);

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      dispatch({ type: TOGGLE_MOBILE_MENU, payload: !isMobileMenuOpen });
    }
  };

  return (
    <div>
      <li className={styles.navItem}>
        <NavLink
          activeClassName={styles.navLinkSelected}
          className={styles.navLink}
          exact={path === '/'}
          onClick={closeMobileMenu}
          to={path}
        >
          {isProfileIcon ? (
            <Icon
              className={`${styles.profileIcon}${
                location.pathname === path ? ` ${styles.profileIconActive}` : ''
              }`}
            />
          ) : (
            <Icon
              className={`${styles.menuIcon}${
                location.pathname === path ? ` ${styles.menuIconActive}` : ''
              }`}
            />
          )}
          {text}
        </NavLink>
      </li>
    </div>
  );
};
MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  isProfileIcon: PropTypes.bool,
};

export default MenuItem;
