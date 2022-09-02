import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../services/reducers/header-reducer';
import TextButton from '../ui-library/Buttons/TextButton/TextButton';
import styles from './langSelect.module.scss';

const LangSelect = () => {
  const dispatch = useDispatch();

  const currentLang = useSelector((state) => state.header.currentLang);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(changeLanguage(value));
  };

  return (
    <>
      <TextButton
        className={`${styles.button} ${currentLang === 'ru' ? styles.button_active : ''}`}
        onClick={handleChange}
        value='ru'
      >
        РУС
      </TextButton>
      <TextButton
        className={`${styles.button} ${styles.button_last} ${
          currentLang === 'en' ? styles.button_active : ''
        }`}
        onClick={handleChange}
        value='en'
      >
        ENG
      </TextButton>
    </>
  );
};

export default LangSelect;
