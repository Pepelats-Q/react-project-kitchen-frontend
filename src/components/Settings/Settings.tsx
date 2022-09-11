import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import agent from '../../agent';
import TextField from '../ui-library/TextField/TextField';
import TextArea from '../ui-library/TextArea/TextArea';
import { HideIcon, ShowIcon } from '../ui-library/Icons';
import { settingsSaved } from '../../services/reducers/settings-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch, useSelector } from '../../hooks/hooks';
import useFormValidation from '../../hooks/useFormValidation';
import AuthForm from '../AuthForm/AuthForm';

const Settings: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { currentUser, token, errorsStore } = useSelector((store) => ({
    currentUser: store.common.currentUser,
    token: store.common.token,
    errorsStore: store.auth.errors,
  }));

  const dispatch = useDispatch();
  const localization = useTranslate();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token]);

  const { values, handleChange, setValues, validities, isValid, errors } = useFormValidation({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (currentUser) {
      setValues({
        image: currentUser.image || '',
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser]);

  const onSubmitForm = (user: any) => {
    dispatch(settingsSaved({ payload: agent.Auth.save(user) }));
  };

  const submitFormHandler = () => {
    const user = { ...values };
    if (!user.password) {
      delete user.password;
    }

    onSubmitForm(user);
  };

  return (
    <AuthForm
      apiErrors={errorsStore?.errors}
      btnText={localization({ page: 'settings', key: 'saveButton' })}
      formName='editor'
      isFormValid={isValid}
      onSubmit={submitFormHandler}
      title={localization({ page: 'settings', key: 'yourSettings' })}
    >
      <TextField
        fieldValid={validities.image}
        label={localization({ page: 'settings', key: 'image' })}
        message={errors.image}
        minLength={6}
        name='image'
        onChange={handleChange}
        placeholder={localization({ page: 'settings', key: 'imageText' })}
        type='URL'
        value={values.image}
      />
      <TextField
        fieldValid={validities.username}
        label={localization({ page: 'settings', key: 'placeholderName' })}
        maxLength={30}
        message={errors.username}
        minLength={2}
        name='username'
        onChange={handleChange}
        placeholder={localization({ page: 'settings', key: 'placeholderName' })}
        required
        type='text'
        value={values.username}
      />
      <TextArea
        label={localization({ page: 'settings', key: 'info' })}
        message={errors.bio}
        name='bio'
        onChange={handleChange}
        placeholder={localization({ page: 'settings', key: 'info' })}
        rows={5}
        value={values.bio}
      />
      <TextField
        autocomplete='new-email'
        fieldValid={validities.email}
        label={localization({ page: 'settings', key: 'placeholderEmail' })}
        maxLength={30}
        message={errors.email}
        minLength={2}
        name='email'
        onChange={handleChange}
        placeholder={localization({ page: 'settings', key: 'placeholderEmail' })}
        required
        type='email'
        value={values.email}
      />
      <TextField
        autocomplete='new-password'
        fieldValid={validities.password}
        icon={
          isPasswordVisible ? (
            <HideIcon onClick={() => setIsPasswordVisible(false)} />
          ) : (
            <ShowIcon onClick={() => setIsPasswordVisible(true)} />
          )
        }
        label={localization({ page: 'settings', key: 'placeholderPass' })}
        maxLength={30}
        message={errors.password}
        minLength={2}
        name='password'
        onChange={handleChange}
        placeholder={localization({ page: 'settings', key: 'placeholderPass' })}
        type={isPasswordVisible ? 'text' : 'password'}
        value={values.password}
      />
    </AuthForm>
  );
};

export default Settings;
