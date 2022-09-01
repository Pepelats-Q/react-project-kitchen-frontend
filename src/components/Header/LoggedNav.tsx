import { FC } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import { HomeIcon, EditIcon, ProfileIconBlank } from '../ui-library/Icons';
import translations from '../../constants/translations';

const LoggedNav: FC = () => {
  const currentLang = useSelector((state: any) => state.header.currentLang);
  const currentUser = useSelector((state: any) => state.common.currentUser);
  const { header } = translations[currentLang];
  return (
    <>
      <MenuItem icon={HomeIcon} path='/' text={header.mainPageText} />
      <MenuItem icon={EditIcon} path='/editor' text={header.newNoteText} />
      <MenuItem
        icon={ProfileIconBlank}
        isProfileIcon
        path={`/@${currentUser.username}`}
        text={currentUser.username}
      />
    </>
  );
};

export default LoggedNav;
