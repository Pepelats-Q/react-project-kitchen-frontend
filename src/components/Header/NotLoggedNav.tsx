import { FC } from 'react';
import { useSelector } from 'react-redux';
import { HomeIcon, LoginIcon, EditIcon } from '../ui-library/Icons';
import translations from '../../constants/translations';
import NavButton from '../ui-library/Buttons/NavButton/NavButton';

const NotLoggedNav: FC = () => {
  const currentLang = useSelector((state: any) => state.header.currentLang);
  const { header } = translations[currentLang];
  return (
    <>
      <NavButton icon={<HomeIcon size='small' />} to='/' type='navigation'>
        {header.mainPageText}
      </NavButton>
      <NavButton icon={<LoginIcon size='small' />} to='/login' type='navigation'>
        {header.loginText}
      </NavButton>
      <NavButton icon={<EditIcon size='small' />} to='/register' type='navigation'>
        {header.registerText}
      </NavButton>
    </>
  );
};

export default NotLoggedNav;
