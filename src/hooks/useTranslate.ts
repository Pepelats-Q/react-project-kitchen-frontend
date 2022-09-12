import { useContext } from 'react';
import { TranslationContext } from '../contexts/context';
import { useSelector } from './hooks';

const useTranslate = () => {
  const context = useContext(TranslationContext);
  const currentLanguage : any = useSelector((store) => store.common.currentLang);

  return (key: { key: string, page: string}) => {
    let translation = key.key;
    if (context[currentLanguage][key.page]) {
      translation = context[currentLanguage][key.page][key.key];
    }

    const result = translation || key.key;

    return result;
  };
};

export default useTranslate;
