import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/hooks';
import { changeLanguage } from '../../services/reducers/header-reducer';
import Button from '../ui-library/Buttons/Button/Button';

const LangSelect: FC = () => {
  const dispatch = useDispatch<any>();
  const currentLang = useSelector((store) => store.header.currentLang);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    dispatch(changeLanguage(value));
  };

  const langValue = currentLang === 'ru' ? 'en' : 'ru';
  const langText = currentLang === 'ru' ? 'РУС' : 'ENG';

  return (
    <Button onClick={handleChange} type='lang' value={langValue}>
      {langText}
    </Button>
  );
};

export default LangSelect;
