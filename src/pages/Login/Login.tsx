import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import agent from '../../agent';
import { LOGIN, SET_API_MESSAGE } from '../../constants/actionTypes';
import useFormValidation from '../../hooks/useFormValidation';
import styles from '../../components/AuthForm/authForm.module.scss';
import AuthForm from '../../components/AuthForm/AuthForm';
import HideIcon from '../../components/ui-library/Icons/HideIcon';
import ShowIcon from '../../components/ui-library/Icons/ShowIcon';
import AlertIcon from '../../components/ui-library/Icons/AlertIcon';
import { TValidity } from '../../utils/typesTs';
import translations from '../../constants/translations';

const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isPassShownLogin, setIsPassShownLogin] = useState(true);

  const { values, handleChange, errors, isValid } = useFormValidation({
    email: '',
    password: '',
  });

  const valuesUsed: TValidity = values;
  const errorsUsed: TValidity = errors;

  const { email, password } = valuesUsed;

  const toggleShowPass = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsPassShownLogin(!isPassShownLogin);
  };

  const submitLogin = () => {
    if (isValid) {
      dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) });
    } else {
      dispatch({ type: SET_API_MESSAGE, payload: ['Заполните все поля формы верно'] });
    }
  };

  const currentUser = useSelector((state: any) => state.common.currentUser);

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser]);

  const currentLang = useSelector((state: any) => state.header.currentLang);

  const { authForm } = translations[currentLang];

  const showPassIcon = isPassShownLogin ? <ShowIcon /> : <HideIcon />;

  return (
    <AuthForm
      btnText={authForm.loginText}
      crossLinkText={authForm.loginQuestion}
      formName='login'
      isFormValid={isValid}
      onSubmit={submitLogin}
      oppositeLink='/register'
    >
      <fieldset className='form-group'>
        <label className={styles.label} htmlFor='email'>
          {authForm.placeholderEmail}
        </label>
        <div className={styles.inputarea}>
          <input
            className={`${styles.input} ${errorsUsed.email ? styles.input_invalid : ''}`}
            maxLength={30}
            minLength={2}
            name='email'
            onChange={handleChange}
            placeholder={authForm.placeholderEmail}
            required
            type='email'
            value={email}
          />
          <p className={styles.error}>{errorsUsed.email}</p>
          <div className={styles.form__icon}>
            {errorsUsed.email ? <AlertIcon color='alert' /> : ''}
          </div>
        </div>
      </fieldset>

      <fieldset className='form-group'>
        <label className={styles.label} htmlFor='password'>
          {authForm.placeholderPass}
        </label>
        <div className={styles.inputarea}>
          <input
            className={`${styles.input} ${errorsUsed.password ? styles.input_invalid : ''}`}
            maxLength={25}
            minLength={2}
            name='password'
            onChange={handleChange}
            placeholder={authForm.placeholderPass}
            required
            type={isPassShownLogin ? 'password' : 'text'}
            value={password}
          />
          <div className={styles.form__icon} onClick={(e) => toggleShowPass(e)}>
            {errorsUsed.password ? <AlertIcon color='alert' /> : showPassIcon}
          </div>
        </div>
        <p className={styles.error}>{errorsUsed.password}</p>
      </fieldset>
    </AuthForm>
  );
};

export default Login;
