import { useDispatch } from 'react-redux';
import { CHANGE_LANG } from '../../constants/actionTypes';
import styles from './langSelect.module.scss';

const LangSelect = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {value} = e.target;
    dispatch({type: CHANGE_LANG, payload: value});
    }


return (
  <select className={styles.langs} onChange={handleChange}>
    <option value='ru'>Русский</option>
    <option value='en'>English</option>
  </select>
);
}

export default LangSelect;
