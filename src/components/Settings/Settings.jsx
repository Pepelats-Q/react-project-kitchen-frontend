import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import ListErrors from '../ListErrors/ListErrors';
import agent from '../../agent';
import { SETTINGS_SAVED, LOGOUT } from '../../constants/actionTypes';
import useForm from '../../hooks/useForm';
import TextField from '../ui-library/TextField/TextField';
import Button from '../ui-library/Buttons/Button/Button';
import TextArea from '../ui-library/TextArea/TextArea';
import { HideIcon, ShowIcon } from '../ui-library/Icons';
import TextButton from '../ui-library/Buttons/TextButton/TextButton';
import styles from './Settings.module.scss';

const Settings = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { currentUser, errors, inProgress } = useSelector((store) => ({
    currentUser: store.common.currentUser,
    errors: store.settings.errors,
    inProgress: store.settings.inProgress,
  }));

  const dispatch = useDispatch();

  const onClickLogout = () => dispatch({ type: LOGOUT });

  // TODO: удалить при рефакторинге редакса
  // const onUnload = () => dispatch({ type: SETTINGS_PAGE_UNLOADED });

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
    dispatch({
      type: SETTINGS_SAVED,
      payload: agent.Auth.save(user),
    });
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
          Ваши настройки
        </h1>

        <ListErrors errors={errors} />

        <form className={styles.form} onSubmit={submitFormHandler}>
          <TextField
            label='Изображение профиля'
            name='image'
            onChange={handleChange}
            placeholder='URL-адрес изображения профиля'
            type='text'
            value={values.image}
          />
          <TextField
            label='Имя пользователя'
            name='username'
            onChange={handleChange}
            placeholder='Имя пользователя'
            type='text'
            value={values.username}
          />
          <TextArea
            label='Информация о вас'
            name='bio'
            onChange={handleChange}
            placeholder='Информация о вас'
            rows={5}
            value={values.bio}
          />
          <TextField
            autocomplete='new-email'
            label='E-mail'
            name='email'
            onChange={handleChange}
            placeholder='Ваш email'
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
            label='Новый пароль'
            name='password'
            onChange={handleChange}
            placeholder='Новый пароль'
            type={isPasswordVisible ? 'text' : 'password'}
            value={values.password}
          />
          <Button className={styles.submit_button} disabled={inProgress} isSubmit>
            Сохранить
          </Button>
        </form>

        <hr className={styles.divider} />
        <TextButton className={styles.exit_button} color='alert' onClick={onClickLogout}>
          Выйти из аккаунта
        </TextButton>
      </div>
    </div>
  );
};

export default Settings;
