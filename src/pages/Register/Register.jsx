import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import agent from '../../agent';
import useFormValidation from '../../hooks/useFormValidation';
import styles from '../../components/AuthForm/AuthForm.module.scss';
import AuthForm from '../../components/AuthForm/AuthForm';
import HideIcon from '../../components/ui-library/Icons/HideIcon';
import ShowIcon from '../../components/ui-library/Icons/ShowIcon';
import AlertIcon from '../../components/ui-library/Icons/AlertIcon';
import translations from '../../constants/translations';
import { register, setApiMessage } from '../../services/reducers/auth-reducer';
import TextField from '../../components/ui-library/TextField/TextField';

const Register = () => {
  const { currentLang, currentUser } = useSelector((store) => ({
    currentLang: store.header.currentLang,
    currentUser: store.header.currentUser,
  }));
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { authForm } = translations[currentLang];

  const { values, handleChange, errors, isValid } = useFormValidation({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const submitRegister = () => {
    if (isValid) {
      dispatch(
        register({ payload: agent.Auth.register(values.name, values.email, values.password) }),
      );
    } else {
      dispatch(setApiMessage(['Заполните все поля формы верно']));
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser]);

  const showPasswordIcon = isPasswordVisible ? (
    <HideIcon onClick={() => setIsPasswordVisible(false)} />
  ) : (
    <ShowIcon onClick={() => setIsPasswordVisible(true)} />
  );

  return (
    <AuthForm
      btnText={authForm.registerText}
      crossLinkText={authForm.registerQuestion}
      formName='register'
      isFormValid={isValid}
      onSubmit={submitRegister}
      oppositeLink='/login'
    >
      <div className={styles.fieldset}>
        <TextField
          icon={errors.password ? <AlertIcon color='alert' /> : null}
          label={authForm.placeholderName}
          maxLength={30}
          minLength={2}
          name='name'
          onChange={handleChange}
          placeholder={authForm.placeholderName}
          required
          type='text'
          value={values.name}
        />
        <p className={styles.error}>{errors.name}</p>
      </div>
      <div className={styles.fieldset}>
        <TextField
          autocomplete='new-email'
          icon={errors.password ? <AlertIcon color='alert' /> : null}
          label={authForm.placeholderEmail}
          maxLength={30}
          minLength={2}
          name='email'
          onChange={handleChange}
          placeholder={authForm.placeholderEmail}
          required
          type='email'
          value={values.email}
        />
        <p className={styles.error}>{errors.email}</p>
      </div>
      <div className={styles.fieldset}>
        <TextField
          autocomplete='new-password'
          icon={errors.password ? <AlertIcon color='alert' /> : showPasswordIcon}
          label={authForm.placeholderPass}
          maxLength={25}
          minLength={2}
          name='password'
          onChange={handleChange}
          placeholder={authForm.placeholderPass}
          required
          type={isPasswordVisible ? 'text' : 'password'}
          value={values.password}
        />
        <p className={styles.error}>{errors.password}</p>
      </div>
    </AuthForm>
  );
};

export default Register;
