import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import { LOGIN, SET_API_MESSAGE } from '../../constants/actionTypes';
import useFormValidation from '../../hooks/useFormValidation';
import styles from '../../components/AuthForm/authForm.module.scss';
import AuthForm from '../../components/AuthForm/AuthForm';
import HideIcon from '../../components/ui-library/Icons/HideIcon';
import ShowIcon from '../../components/ui-library/Icons/ShowIcon';
import AlertIcon from '../../components/ui-library/Icons/AlertIcon';
import { TValidity } from '../../utils/typesTs';

const Login: FC = () => {
  const dispatch = useDispatch();
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

  const showPassIcon = isPassShownLogin ? <ShowIcon /> : <HideIcon />;

  return (
    <AuthForm
      btnText='Войти'
      crossLinkText='Нужно зарегистрироваться?'
      formName='login'
      isFormValid={isValid}
      onSubmit={submitLogin}
      oppositeLink='/register'
    >
      <fieldset className='form-group'>
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
        <div className={styles.inputarea}>
          <input
            className={`${styles.input} ${errorsUsed.email ? styles.input_invalid : ''}`}
            maxLength={30}
            minLength={2}
            name='email'
            onChange={handleChange}
            placeholder='Email'
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
          Пароль
        </label>
        <div className={styles.inputarea}>
          <input
            className={`${styles.input} ${errorsUsed.password ? styles.input_invalid : ''}`}
            maxLength={25}
            minLength={2}
            name='password'
            onChange={handleChange}
            placeholder='Пароль'
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
