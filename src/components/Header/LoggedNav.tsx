import { FC, useEffect, useState } from 'react';
import { HomeIcon, EditIcon } from '../ui-library/Icons';
import useSelector from '../../hooks/hooks';
import NavButton from '../ui-library/Buttons/NavButton/NavButton';
import avatarTemp from '../../images/avatarTemp.svg';
import useTranslate from '../../hooks/useTranslate';

const LoggedNav: FC = () => {
  const [imgSrc, setImgSrc] = useState(avatarTemp);

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

  return (
    <>
      <NavButton icon={<HomeIcon size='small' />} to='/' type='navigation'>
        {localization({ page: 'header', key: 'mainPageText' })}
      </NavButton>
      <NavButton icon={<EditIcon size='small' />} to='/editor' type='navigation'>
        {localization({ page: 'header', key: 'newNoteText' })}
      </NavButton>
      <NavButton
        icon={<img alt='profile name' src={imgSrc} />}
        to={`/@${currentUser.username}`}
        type='navigation'
      >
        {currentUser.username}
      </NavButton>
    </>
  );
};

export default LoggedNav;
