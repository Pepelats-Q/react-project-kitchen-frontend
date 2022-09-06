import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { TranslationContext } from '../contexts/context';

const useTranslate = () => {
  const context = useContext(TranslationContext);
  const currentLanguage = useSelector(store => store.header.currentLang);

  return (key) => {
    let translation = key;
    if (context[currentLanguage][key.page]) {
      translation = context[currentLanguage][key.page][key.key];
    }
    
    const result = translation || key.key;

    return result;
  };
};

export default useTranslate;
