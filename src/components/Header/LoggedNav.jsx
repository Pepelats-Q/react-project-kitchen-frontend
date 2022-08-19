import MenuItem from './MenuItem';
import { HomeIcon, EditIcon, ProfileIconBlank } from '../ui-library/Icons';
import currentUserType from '../../utils/types';

const LoggedNav = ({ currentUser }) => (
  <>
    <MenuItem icon={HomeIcon} path='/' text='Главная' />
    <MenuItem icon={EditIcon} path='/editor' text='Новая запись' />
    {/* <MenuItem icon={GearIcon} path='/settings' text='Настройки' /> */}
    <MenuItem
      icon={ProfileIconBlank}
      isProfileIcon
      path={`/@${currentUser.username}`}
      text={currentUser.username}
    />
  </>
);

LoggedNav.propTypes = {
  currentUser: currentUserType.isRequired,
};

export default LoggedNav;
