import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import ListErrors from '../ListErrors/ListErrors';
import agent from '../../agent';
import useForm from '../../hooks/useForm';
import TextField from '../ui-library/TextField/TextField';
import Button from '../ui-library/Buttons/Button/Button';
import TextArea from '../ui-library/TextArea/TextArea';
import { HideIcon, ShowIcon } from '../ui-library/Icons';
import styles from './Settings.module.scss';
import translations from '../../constants/translations';
import { settingsSaved } from '../../services/reducers/settings-reducer';

const Settings = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { currentLang, currentUser, errors, inProgress, token } = useSelector((store) => ({
    currentLang: store.header.currentLang,
    currentUser: store.common.currentUser,
    errors: store.settings.errors,
    inProgress: store.settings.inProgress,
    token: store.common.token,
  }));
  const { settings } = translations[currentLang];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token]);

  const { values, handleChange, setValues } = useForm({
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

  const onSubmitForm = (user) => {
    dispatch(settingsSaved({ payload: agent.Auth.save(user) }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const user = { ...values };
    if (!user.password) {
      delete user.password;
    }

    onSubmitForm(user);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={clsx(styles.title, 'header-h2 align-center color-primary')}>
          {settings.yourSettings}
        </h1>

        <ListErrors errors={errors} />

        <form className={styles.form} onSubmit={submitFormHandler}>
          <TextField
            label={settings.image}
            name='image'
            onChange={handleChange}
            placeholder={settings.imageText}
            type='text'
            value={values.image}
          />
          <TextField
            label={settings.placeholderName}
            name='username'
            onChange={handleChange}
            placeholder={settings.placeholderName}
            type='text'
            value={values.username}
          />
          <TextArea
            label={settings.info}
            name='bio'
            onChange={handleChange}
            placeholder={settings.info}
            rows={5}
            value={values.bio}
          />
          <TextField
            autocomplete='new-email'
            label={settings.placeholderEmail}
            name='email'
            onChange={handleChange}
            placeholder={settings.placeholderEmail}
            type='email'
            value={values.email}
          />
          <TextField
            autocomplete='new-password'
            icon={
              isPasswordVisible ? (
                <HideIcon onClick={() => setIsPasswordVisible(false)} />
              ) : (
                <ShowIcon onClick={() => setIsPasswordVisible(true)} />
              )
            }
            label={settings.placeholderPass}
            name='password'
            onChange={handleChange}
            placeholder={settings.placeholderPass}
            type={isPasswordVisible ? 'text' : 'password'}
            value={values.password}
          />
          <Button className={styles.submit_button} disabled={inProgress} isSubmit>
            {settings.saveButton}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
