import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ListErrors from '../ListErrors/ListErrors';
import styles from './AuthForm.module.scss';
import Button from '../ui-library/Buttons/Button/Button';
import { TValidity } from '../../utils/types';
import useTranslate from '../../hooks/useTranslate';

type TAuthForm = {
  btnText: string;
  children: React.ReactNode;
  crossLinkText?: string;
  formName: string;
  isFormValid: boolean;
  title: string;
  onSubmit: () => void;
  onSubmitBlur?: (e: any) => void;
  oppositeLink?: string;
  apiErrors: TValidity;
};

const AuthForm: FC<TAuthForm> = ({
  btnText,
  oppositeLink,
  crossLinkText,
  formName,
  onSubmit,
  isFormValid,
  onSubmitBlur,
  title,
  children,
  apiErrors,
}) => {
  const handleSubmitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      if (onSubmitBlur) {
        onSubmitBlur(event);
      }
    } else {
      onSubmit();
    }
  };
  const localization = useTranslate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.formBox}>
          <h1 className={clsx(styles.title, 'header-h2')}>{title}</h1>
          {oppositeLink ? (
            <div className={styles.oppositeLink}>
              <Link className={clsx(styles.link, 'text-default')} to={oppositeLink}>
                {crossLinkText}
              </Link>
            </div>
          ) : (
            ''
          )}

          <ListErrors errors={apiErrors} />

          <form className={styles.form} name={formName} noValidate onSubmit={handleSubmitForm}>
            {children}
            <div className={styles.submit_container}>
              <p className={styles.text}>
                <sup>*</sup> {localization({ page: 'authForm', key: 'requiredField' })}
              </p>
              <div className={styles.submit}>
                <Button className={styles.submit_button} isSubmit>
                  {btnText}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
