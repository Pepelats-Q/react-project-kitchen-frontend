import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import { HomeIcon, EditIcon, ProfileIconBlank } from '../ui-library/Icons';
import currentUserType from '../../utils/types';

import translations from '../../constants/translations';

const LoggedNav = ({ currentUser }) => {
  const currentLang = useSelector((state) => state.header.currentLang);
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

LoggedNav.propTypes = {
  currentUser: currentUserType.isRequired,
};

export default LoggedNav;
