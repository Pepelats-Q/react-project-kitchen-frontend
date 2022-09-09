import { FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ListErrors from '../ListErrors/ListErrors';
import styles from './AuthForm.module.scss';
import Button from '../ui-library/Buttons/Button/Button';
import { TAuthForm } from '../../utils/typesTs';
import useSelector from '../../hooks/hooks';

const AuthForm: FC<TAuthForm> = ({
  btnText,
  oppositeLink,
  crossLinkText,
  formName,
  onSubmit,
  isFormValid,
  children,
}) => {
  const apiErrors = useSelector((store) => store.auth.errors);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.formBox}>
          <h1 className={clsx(styles.title, 'header-h2')}>{btnText}</h1>
          <div className={styles.oppositeLink}>
            <Link className={clsx(styles.link, 'text-default')} to={oppositeLink}>
              {crossLinkText}
            </Link>
          </div>

          <ListErrors errors={apiErrors} />

          <form className={styles.form} name={formName} noValidate onSubmit={handleSubmitForm}>
            {children}
            <div className={styles.submit}>
              <Button
                className={styles.submit_button}
                disabled={!isFormValid}
                onClick={handleSubmitForm}
              >
                {btnText}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
