import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './header.module.scss';
import { toggleMobileMenuAction } from '../../services/reducers/header-reducer';

const MenuItem = ({ text, icon: Icon, path, isProfileIcon }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state) => state.header.isMobileMenuOpen);

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      dispatch(toggleMobileMenuAction(!isMobileMenuOpen));
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
  icon: PropTypes.func.isRequired,
  isProfileIcon: PropTypes.bool,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MenuItem;
