import { useState } from 'react';
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import { REGISTER, SET_API_MESSAGE } from '../../constants/actionTypes';
import useFormValidation from '../../hooks/useFormValidation';
import styles from '../../components/AuthForm/authForm.module.scss';
import AuthForm from '../../components/AuthForm/AuthForm';
import HideIcon from '../../components/ui-library/Icons/HideIcon';
import ShowIcon from '../../components/ui-library/Icons/ShowIcon';
import AlertIcon from '../../components/ui-library/Icons/AlertIcon';

const Register = () => {
  const dispatch = useDispatch();
  const [isPassShownLogin, setIsPassShownLogin] = useState(true);

  const { values, handleChange, errors, isValid } = useFormValidation({
    name: '',
    email: '',
    password: '',
  });

  const { email, password, name } = values;

  const toggleShowPass = (e) => {
    e.preventDefault();
    setIsPassShownLogin(!isPassShownLogin);
  };

  const submitRegister = () => {
    if (isValid) {
      dispatch({ type: REGISTER, payload: agent.Auth.register(name, email, password) });
    } else {
      dispatch({ type: SET_API_MESSAGE, payload: ['Заполните все поля формы верно'] });
    }
  };

  const showPassIcon = isPassShownLogin ? <ShowIcon /> : <HideIcon />;

  return (
    <AuthForm
      btnText='Зарегистрироваться'
      crossLinkText='Уже есть аккаунт?'
      formName='register'
      isFormValid={isValid}
      onSubmit={submitRegister}
      oppositeLink='/login'
    >
      <fieldset className='form-group'>
        <label className={styles.label} htmlFor='name'>
          Имя пользователя
        </label>
        <div className={styles.inputarea}>
          <input
            className={`${styles.input} ${errors.name ? styles.input_invalid : ''}`}
            maxLength='25'
            minLength='2'
            name='name'
            onChange={handleChange}
            placeholder='Имя пользователя'
            required
            type='text'
            value={name}
          />
          <p className={styles.error}>{errors.name}</p>
          <div className={styles.form__icon}>{errors.name ? <AlertIcon color='alert' /> : ''}</div>
        </div>
      </fieldset>

      <fieldset className='form-group'>
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
        <div className={styles.inputarea}>
          <input
            className={`${styles.input} ${errors.email ? styles.input_invalid : ''}`}
            maxLength='30'
            minLength='2'
            name='email'
            onChange={handleChange}
            placeholder='Email'
            required
            type='email'
            value={email}
          />
          <p className={styles.error}>{errors.email}</p>
          <div className={styles.form__icon}>{errors.email ? <AlertIcon color='alert' /> : ''}</div>
        </div>
      </fieldset>

      <fieldset className='form-group'>
        <label className={styles.label} htmlFor='password'>
          Пароль
        </label>
        <div className={styles.inputarea}>
          <input
            className={`${styles.input} ${errors.password ? styles.input_invalid : ''}`}
            maxLength='25'
            minLength='2'
            name='password'
            onChange={handleChange}
            placeholder='Пароль'
            required
            type={isPassShownLogin ? 'password' : 'text'}
            value={password}
          />
          <div className={styles.form__icon} onClick={(e) => toggleShowPass(e)}>
            {errors.password ? <AlertIcon color='alert' /> : showPassIcon}
          </div>
        </div>
        <p className={styles.error}>{errors.password}</p>
      </fieldset>
    </AuthForm>
  );
};

export default Register;
