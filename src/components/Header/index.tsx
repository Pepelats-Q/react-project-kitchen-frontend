import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotLoggedNav from './NotLoggedNav';
import LoggedNav from './LoggedNav';
import styles from './header.module.scss';
import MenuIcon from '../ui-library/Icons/MenuIcon';
import LangSelect from '../LangSelect/LangSelect';
import { toggleMobileMenuAction } from '../../services/reducers/header-reducer';
import agent from '../../agent';
import { getProfile } from '../../services/reducers/profile-reducer';
import { useDispatch, useSelector } from '../../hooks/hooks';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen, appName, currentUser } = useSelector((store) => ({
    isMobileMenuOpen: store.header.isMobileMenuOpen,
    appName: store.common.appName,
    currentUser: store.common.currentUser,
  }));

  useEffect(() => {
    if (currentUser) {
      dispatch(getProfile({ payload: agent.Profile.get(currentUser.username) }));
    }
  }, [currentUser]);

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
