import React from 'react';
import { useDispatch } from 'react-redux';
import agent from '../../../agent';
import { REGISTER, SET_API_MESSAGE } from '../../../constants/actionTypes';
import { useFormValidation } from '../../../hooks/useFormValidation';
import styles from '../../AuthForm/authForm.module.scss';
import { useState } from 'react';
import AuthForm from '../../AuthForm/AuthForm';
import HideIcon from '../../ui-library/Icons/HideIcon';
import ShowIcon from '../../ui-library/Icons/ShowIcon';
import AlertIcon from '../../ui-library/Icons/AlertIcon';

const { error, input, label, inputarea, form__icon, input_invalid } = styles;

function Register(props) {
  const dispatch = useDispatch();
  const [isPassShownLogin, setIsPassShownLogin] = useState(true);

  const { values, handleChange, errors, isValid } = useFormValidation({
    name: '',
    email: '',
    password: '',
  });

  const { email, password, name } = values;

  function toggleShowPass(e) {
    e.preventDefault();
    setIsPassShownLogin(!isPassShownLogin);
  }

  function submitRegister() {
    if (isValid) {
      dispatch({ type: REGISTER, payload: agent.Auth.register(name, email, password) });
    } else {
      dispatch({ type: SET_API_MESSAGE, payload: ['Заполните все поля формы верно'] });
    }
  }

  return (
    <AuthForm
      onSubmit={submitRegister}
      btnText='Зарегистрироваться'
      crossLinkText='Уже есть аккаунт?'
      formName='register'
      oppositeLink='/login'
      isFormValid={isValid}
    >
      <fieldset className='form-group'>
        <label htmlFor='name' className={label}>
          Имя пользователя
        </label>
        <div className={inputarea}>
          <input
            className={`${input} ${errors.name ? input_invalid : ''}`}
            type='text'
            placeholder='Имя пользователя'
            name='name'
            value={name}
            onChange={handleChange}
            required
            minLength='2'
            maxLength='25'
          />
          <p className={error}>{errors.name}</p>
          <div className={form__icon}>{errors.name ? <AlertIcon color='alert' /> : <></>}</div>
        </div>
      </fieldset>

      <fieldset className='form-group'>
        <label htmlFor='email' className={label}>
          Email
        </label>
        <div className={inputarea}>
          <input
            className={`${input} ${errors.email ? input_invalid : ''}`}
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
            required
            minLength='2'
            maxLength='30'
          />
          <p className={error}>{errors.email}</p>
          <div className={form__icon}>{errors.email ? <AlertIcon color='alert' /> : <></>}</div>
        </div>
      </fieldset>

      <fieldset className='form-group'>
        <label htmlFor='password' className={label}>
          Пароль
        </label>
        <div className={inputarea}>
          <input
            className={`${input} ${errors.password ? input_invalid : ''}`}
            type={isPassShownLogin ? 'password' : 'text'}
            placeholder='Пароль'
            name='password'
            value={password}
            onChange={handleChange}
            required
            minLength='2'
            maxLength='25'
          />
          <div className={form__icon} onClick={(e) => toggleShowPass(e)}>
            {errors.password ? (
              <AlertIcon color='alert' />
            ) : isPassShownLogin ? (
              <ShowIcon />
            ) : (
              <HideIcon />
            )}
          </div>
        </div>
        <p className={error}>{errors.password}</p>
      </fieldset>
    </AuthForm>
  );
}

export default Register;
