import { FC } from 'react';
import { HomeIcon, LoginIcon, EditIcon } from '../ui-library/Icons';
import NavButton from '../ui-library/Buttons/NavButton/NavButton';
import useTranslate from '../../hooks/useTranslate';

const NotLoggedNav: FC = () => {
  const localization = useTranslate();
  return (
    <>
      <NavButton icon={<HomeIcon size='small' />} to='/' type='navigation'>
        {localization({ page: 'header', key: 'mainPageText' })}
      </NavButton>
      <NavButton icon={<LoginIcon size='small' />} to='/login' type='navigation'>
        {localization({ page: 'header', key: 'loginText' })}
      </NavButton>
      <NavButton icon={<EditIcon size='small' />} to='/register' type='navigation'>
        {localization({ page: 'header', key: 'registerText' })}
      </NavButton>
    </>
  );
};

export default NotLoggedNav;
