import { FC } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import { HomeIcon, LoginIcon, EditIcon } from '../ui-library/Icons';
import translations from '../../constants/translations';

const NotLoggedNav: FC = () => {
  const currentLang = useSelector((state: any) => state.header.currentLang);
  const { header } = translations[currentLang];
  return (
    <>
      <MenuItem icon={HomeIcon} path='/' text={header.mainPageText} />
      <MenuItem icon={LoginIcon} path='/login' text={header.loginText} />
      <MenuItem icon={EditIcon} path='/register' text={header.registerText} />
    </>
  );
};

export default NotLoggedNav;
