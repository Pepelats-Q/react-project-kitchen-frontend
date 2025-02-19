import React, { FC } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { changeLanguage } from '../../services/reducers/common-reducer';
import Button from '../ui-library/Buttons/Button/Button';

const LangSelect: FC = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector((store) => store.common.currentLang);

  const handleChange = (e: React.SyntheticEvent) => {
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
