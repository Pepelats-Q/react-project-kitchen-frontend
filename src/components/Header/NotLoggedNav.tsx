import { FC } from 'react';
import { HomeIcon, LoginIcon, EditIcon } from '../ui-library/Icons';
import NavButton from '../ui-library/Buttons/NavButton/NavButton';
import useTranslate from '../../hooks/useTranslate';
import { TNavHeader } from '../../utils/types';

const NotLoggedNav: FC<TNavHeader> = ({ unFoldMobileMenu }) => {
  const localization = useTranslate();
  return (
    <>
      <NavButton icon={<HomeIcon size='small' />} onClick={unFoldMobileMenu} to='/'>
        {localization({ page: 'header', key: 'mainPageText' })}
      </NavButton>
      <NavButton icon={<LoginIcon size='small' />} onClick={unFoldMobileMenu} to='/login'>
        {localization({ page: 'header', key: 'loginText' })}
      </NavButton>
      <NavButton icon={<EditIcon size='small' />} onClick={unFoldMobileMenu} to='/register'>
        {localization({ page: 'header', key: 'registerText' })}
      </NavButton>
    </>
  );
};

export default NotLoggedNav;
