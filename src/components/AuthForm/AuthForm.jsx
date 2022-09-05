import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ListErrors from '../ListErrors/ListErrors';
import styles from './AuthForm.module.scss';
import Button from '../ui-library/Buttons/Button/Button';

const AuthForm = ({
  btnText,
  oppositeLink,
  crossLinkText,
  formName,
  onSubmit,
  isFormValid,
  children,
}) => {
  const apiErrors = useSelector((state) => state.auth.errors);

  const handleSubmitForm = (e) => {
    e.preventDefault();
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
              <Button className={styles.submit_button} disabled={!isFormValid} onClick={handleSubmitForm}>
                {btnText}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node.isRequired,
  crossLinkText: PropTypes.string,
  formName: PropTypes.string,
  isFormValid: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  oppositeLink: PropTypes.string,
};

export default AuthForm;
