import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HomeIcon, EditIcon } from '../ui-library/Icons';
import translations from '../../constants/translations';
import NavButton from '../ui-library/Buttons/NavButton/NavButton';
import avatarTemp from '../../images/avatarTemp.svg';

const LoggedNav: FC = () => {
  const [imgSrc, setImgSrc] = useState(avatarTemp);

  const { currentLang, currentUser, currentUserImg } = useSelector((store: any) => ({
    currentLang: store.header.currentLang,
    currentUser: store.common.currentUser,
    currentUserImg: store.common.currentUser.image,
  }));
  const { header } = translations[currentLang];

  useEffect(() => {
    if (currentUserImg) {
      setImgSrc(currentUserImg);
    }
  }, [currentUserImg]);

  return (
    <>
      <NavButton icon={<HomeIcon size='small' />} to='/' type='navigation'>
        {header.mainPageText}
      </NavButton>
      <NavButton icon={<EditIcon size='small' />} to='/editor' type='navigation'>
        {header.newNoteText}
      </NavButton>
      <NavButton image={imgSrc} to={`/@${currentUser.username}`} type='navigation'>
        {currentUser.username}
      </NavButton>
    </>
  );
};

export default LoggedNav;
