import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../services/reducers/header-reducer';
import TextButton from '../ui-library/Buttons/TextButton/TextButton';

const LangSelect: FC = () => {
  const dispatch = useDispatch<any>();

  const currentLang = useSelector((state: any) => state.header.currentLang);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    dispatch(changeLanguage(value));
  };

  return (
    <>
      <TextButton
        active={currentLang === 'ru'}
        onClick={handleChange}
        typeBtn='languages'
        value='ru'
      >
        РУС
      </TextButton>
      <TextButton
        active={currentLang === 'en'}
        onClick={handleChange}
        typeBtn='languages'
        value='en'
      >
        ENG
      </TextButton>
    </>
  );
};

export default LangSelect;
