import { FC } from 'react';
import { HomeIcon, LoginIcon, EditIcon } from '../ui-library/Icons';
import NavButton from '../ui-library/Buttons/NavButton/NavButton';
import useTranslate from '../../hooks/useTranslate';
import { TNavHeader } from '../../utils/types';
import styles from './header.module.scss';

const NotLoggedNav: FC<TNavHeader> = ({ unFoldMobileMenu }) => {
  const localization = useTranslate();
  return (
    <>
      <li className={styles.navItem}>
        <NavButton icon={<HomeIcon size='small' />} onClick={unFoldMobileMenu} to='/'>
          {localization({ page: 'header', key: 'mainPageText' })}
        </NavButton>
      </li>
      <li className={styles.navItem}>
        <NavButton icon={<LoginIcon size='small' />} onClick={unFoldMobileMenu} to='/login'>
          {localization({ page: 'header', key: 'loginText' })}
        </NavButton>
      </li>
      <li className={styles.navItem}>
        <NavButton icon={<EditIcon size='small' />} onClick={unFoldMobileMenu} to='/register'>
          {localization({ page: 'header', key: 'registerText' })}
        </NavButton>
      </li>
    </>
  );
};

export default NotLoggedNav;
