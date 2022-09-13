import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotLoggedNav from './NotLoggedNav';
import LoggedNav from './LoggedNav';
import styles from './header.module.scss';
import MenuIcon from '../ui-library/Icons/MenuIcon';
import LangSelect from '../LangSelect/LangSelect';
import agent from '../../agent';
import { getProfile } from '../../services/reducers/profile-reducer';
import { useDispatch, useSelector } from '../../hooks/hooks';
import useResize from '../../hooks/useResize';

const Header: FC = () => {
  const dispatch = useDispatch();
  const size = useResize();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { appName, currentUser } = useSelector((store) => ({
    appName: store.common.appName,
    currentUser: store.common.currentUser,
  }));

  const appLoaded = useSelector((store) => store.common.appLoaded);

  const unFoldMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (size[0] > 768) {
      unFoldMobileMenu();
    }
  }, [size]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getProfile({ payload: agent.Profile.get(currentUser.username) }));
    }
  }, [currentUser]);

  const currentNav = currentUser ? (
    <LoggedNav unFoldMobileMenu={unFoldMobileMenu} />
  ) : (
    <NotLoggedNav unFoldMobileMenu={unFoldMobileMenu} />
  );
  const langSelect = (
    <li className={styles.navItem}>
      <LangSelect />
    </li>
  );
  const currentHeader = appLoaded ? currentNav : '';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`navbar navbar-light ${styles.container}`}>
        <div className={styles.header}>
          <Link className={styles.navLogo} to='/'>
            {appName}
          </Link>

          <ul className={`nav navbar-nav pull-xs-right ${styles.nav}`}>
            {currentHeader}
            {langSelect}
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
          {currentHeader}
          {langSelect}
        </ul>
      </div>
    </>
  );
};

export default Header;
