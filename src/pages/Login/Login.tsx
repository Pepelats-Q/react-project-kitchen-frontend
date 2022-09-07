import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import agent from '../../agent';
import useFormValidation from '../../hooks/useFormValidation';
import styles from '../../components/AuthForm/AuthForm.module.scss';
import AuthForm from '../../components/AuthForm/AuthForm';
import HideIcon from '../../components/ui-library/Icons/HideIcon';
import ShowIcon from '../../components/ui-library/Icons/ShowIcon';
import AlertIcon from '../../components/ui-library/Icons/AlertIcon';
import { login, setApiMessage } from '../../services/reducers/auth-reducer';
import { redirect } from '../../services/reducers/common-reducer';
import TextField from '../../components/ui-library/TextField/TextField';
import useTranslate from '../../hooks/useTranslate';
import useSelector from '../../hooks/hooks';

const Login: FC = () => {
  const currentUser = useSelector((store) => store.common.currentUser);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const localization = useTranslate();
  const history = useHistory();
  const { values, handleChange, errors, isValid } = useFormValidation({
    email: '',
    password: '',
  });

  const submitLogin = () => {
    if (isValid) {
      dispatch(login({ payload: agent.Auth.login(values.email, values.password) }));
    } else {
      dispatch(setApiMessage(['Заполните все поля формы верно']));
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/');
      dispatch(redirect());
    }
  }, [currentUser]);

  const showPasswordIcon = isPasswordVisible ? (
    <HideIcon onClick={() => setIsPasswordVisible(false)} />
  ) : (
    <ShowIcon onClick={() => setIsPasswordVisible(true)} />
  );

  return (
    <AuthForm
      btnText={localization({ page: 'authForm', key: 'loginText' })}
      crossLinkText={localization({ page: 'authForm', key: 'loginQuestion' })}
      formName='login'
      isFormValid={isValid}
      onSubmit={submitLogin}
      oppositeLink='/register'
    >
      <div className={styles.fieldset}>
        <TextField
          icon={errors.password ? <AlertIcon color='alert' /> : null}
          label={localization({ page: 'authForm', key: 'placeholderEmail' })}
          maxLength={30}
          minLength={2}
          name='email'
          onChange={handleChange}
          placeholder={localization({ page: 'authForm', key: 'placeholderEmail' })}
          required
          type='email'
          value={values.email}
        />
        <p className={styles.error}>{errors.email}</p>
      </div>

      <div className={styles.fieldset}>
        <TextField
          icon={errors.password ? <AlertIcon color='alert' /> : showPasswordIcon}
          label={localization({ page: 'authForm', key: 'placeholderPass' })}
          maxLength={25}
          minLength={2}
          name='password'
          onChange={handleChange}
          placeholder={localization({ page: 'authForm', key: 'placeholderPass' })}
          required
          type={isPasswordVisible ? 'text' : 'password'}
          value={values.password}
        />
        <p className={styles.error}>{errors.password}</p>
      </div>
    </AuthForm>
  );
};

export default Login;
