import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import currentUserType from '../../utils/types';
import NotLoggedNav from './NotLoggedNav';
import LoggedNav from './LoggedNav';
import styles from './header.module.scss';
import MenuIcon from '../ui-library/Icons/MenuIcon';
import { TOGGLE_MOBILE_MENU } from '../../constants/actionTypes';
import LangSelect from '../LangSelect/LangSelect';

const Header = ({ appName, currentUser }) => {
  const currentNav = currentUser ? <LoggedNav currentUser={currentUser} /> : <NotLoggedNav />;

  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state) => state.header.isMobileMenuOpen);

  const toggleMobileMenu = () => {
    dispatch({ type: TOGGLE_MOBILE_MENU, payload: !isMobileMenuOpen });
  };

  return (
    <>
      <nav className={`navbar navbar-light ${styles.container}`}>
        <div className={`container ${styles.header}`}>
          <Link className={styles.navLogo} to='/'>
            {appName}
          </Link>

          <ul className={`nav navbar-nav pull-xs-right ${styles.nav}`}>
            {currentNav}
            <li className={styles.navItem}>
              <LangSelect />
            </li>
          </ul>
          <button className={styles.button_type_mobile} onClick={toggleMobileMenu} type='button'>
            <MenuIcon />
          </button>
        </div>
      </nav>

      <div
        className={`${styles.header__mobile} ${isMobileMenuOpen ? styles.mobileNav_opened : ''}`}
      >
        <ul className={styles.mobileNav}>
          {currentNav}
          <li className={styles.navItem}>
            <LangSelect />
          </li>
        </ul>
      </div>
    </>
  );
};

Header.propTypes = {
  appName: PropTypes.string.isRequired,
  currentUser: currentUserType,
};

export default Header;
