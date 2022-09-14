import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeIcon, EditIcon } from '../ui-library/Icons';
import { useSelector } from '../../hooks/hooks';
import NavButton from '../ui-library/Buttons/NavButton/NavButton';
import avatarTemp from '../../images/avatarTemp.svg';
import useTranslate from '../../hooks/useTranslate';
import styles from './header.module.scss';
import { TNavHeader } from '../../utils/types';

const LoggedNav: FC<TNavHeader> = ({ unFoldMobileMenu }) => {
  const [imgSrc, setImgSrc] = useState<string>(avatarTemp);
  const location = useLocation();
  const path = location.pathname;

  const { currentUser, currentUserImg } = useSelector((store) => ({
    currentUser: store.common.currentUser,
    currentUserImg: store.common.currentUser.image,
  }));

  const localization = useTranslate();

  useEffect(() => {
    if (currentUserImg) {
      setImgSrc(currentUserImg);
    }
  }, [currentUserImg]);

  const homeButtonClass = path === '/' || path === '/your-feed' ? styles.navBtn_active : '';
  const profileButtonClass =
    path === `/@${currentUser.username}` || path === `/@${currentUser.username}/favorites`
      ? styles.navBtn_active
      : '';

  return (
    <>
      {' '}
      <li className={styles.navItem}>
        <NavButton
          className={homeButtonClass}
          icon={<HomeIcon />}
          onClick={unFoldMobileMenu}
          to='/'
        >
          {localization({ page: 'header', key: 'mainPageText' })}
        </NavButton>
      </li>{' '}
      <li className={styles.navItem}>
        <NavButton icon={<EditIcon size='small' />} onClick={unFoldMobileMenu} to='/editor'>
          {localization({ page: 'header', key: 'newNoteText' })}
        </NavButton>
      </li>{' '}
      <li className={styles.navItem}>
        <NavButton
          className={profileButtonClass}
          icon={<img alt='alt' className={styles.image} src={imgSrc} />}
          onClick={unFoldMobileMenu}
          to={`/@${currentUser.username}`}
        >
          {currentUser.username}
        </NavButton>
      </li>
    </>
  );
};

export default LoggedNav;
