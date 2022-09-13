import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import agent from '../../agent';
import useFormValidation from '../../hooks/useFormValidation';
import AuthForm from '../../components/AuthForm/AuthForm';
import HideIcon from '../../components/ui-library/Icons/HideIcon';
import ShowIcon from '../../components/ui-library/Icons/ShowIcon';
import AlertIcon from '../../components/ui-library/Icons/AlertIcon';
import { login, setApiMessage } from '../../services/reducers/auth-reducer';
import { redirect } from '../../services/reducers/common-reducer';
import TextField from '../../components/ui-library/TextField/TextField';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch, useSelector } from '../../hooks/hooks';

const Login: FC = () => {
  const { currentUser, errorsStore } = useSelector((store) => ({
    currentUser: store.common.currentUser,
    errorsStore: store.auth.errors,
  }));
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const localization = useTranslate();
  const history = useHistory();
  const { values, handleChange, errors, isValid, validities, handleBlur, handleSubmitBlur } =
    useFormValidation({
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
      apiErrors={errorsStore}
      btnText={localization({ page: 'authForm', key: 'loginText' })}
      crossLinkText={localization({ page: 'authForm', key: 'loginQuestion' })}
      formName='login'
      isFormValid={isValid}
      onSubmit={submitLogin}
      onSubmitBlur={handleSubmitBlur}
      oppositeLink='/register'
      title={localization({ page: 'authForm', key: 'loginText' })}
    >
      <TextField
        fieldValid={validities.email}
        icon={errors.email ? <AlertIcon color='alert' /> : null}
        label={localization({ page: 'authForm', key: 'placeholderEmail' })}
        maxLength={30}
        message={errors.email}
        minLength={3}
        name='email'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={localization({ page: 'authForm', key: 'placeholderEmail' })}
        required
        type='email'
        value={values.email}
      />
      <TextField
        fieldValid={validities.password}
        icon={errors.password ? <AlertIcon color='alert' /> : showPasswordIcon}
        label={localization({ page: 'authForm', key: 'placeholderPass' })}
        maxLength={25}
        message={errors.password}
        minLength={2}
        name='password'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={localization({ page: 'authForm', key: 'placeholderPass' })}
        required
        type={isPasswordVisible ? 'text' : 'password'}
        value={values.password}
      />
    </AuthForm>
  );
};

export default Login;
