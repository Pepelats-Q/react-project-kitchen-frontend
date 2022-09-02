import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotLoggedNav from './NotLoggedNav';
import LoggedNav from './LoggedNav';
import styles from './header.module.scss';
import MenuIcon from '../ui-library/Icons/MenuIcon';
import LangSelect from '../LangSelect/LangSelect';
import { toggleMobileMenuAction } from '../../services/reducers/header-reducer';

const Header: FC = () => {
  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state: any) => state.header.isMobileMenuOpen);
  const appName = useSelector((state: any) => state.common.appName);
  const currentUser = useSelector((state: any) => state.common.currentUser);
  const currentNav = currentUser ? <LoggedNav /> : <NotLoggedNav />;

  const toggleMobileMenu = () => {
    dispatch(toggleMobileMenuAction(!isMobileMenuOpen));
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

export default Header;
