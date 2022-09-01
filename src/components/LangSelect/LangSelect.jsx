import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_LANG } from '../../constants/actionTypes';
import TextButton from '../ui-library/Buttons/TextButton/TextButton';
import styles from './langSelect.module.scss';

const LangSelect = () => {
  const dispatch = useDispatch();

  const currentLang = useSelector((state) => state.header.currentLang);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch({ type: CHANGE_LANG, payload: value });
  };

  return (
    <>
      <TextButton
        onClick={handleChange}
        value='ru'
        className={`${styles.button} ${currentLang === 'ru' ? styles.button_active : ''}`}
      >
        РУС
      </TextButton>
      <TextButton
        onClick={handleChange}
        value='en'
        className={`${styles.button} ${styles.button_last} ${
          currentLang === 'en' ? styles.button_active : ''
        }`}
      >
        ENG
      </TextButton>
    </>
  );
};

export default LangSelect;
