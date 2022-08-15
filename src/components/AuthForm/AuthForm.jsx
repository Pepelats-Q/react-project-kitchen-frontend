import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ListErrors from '../ListErrors/ListErrors';
import styles from './authForm.module.scss';
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
          <h1 className={styles.title}>{btnText}</h1>
          <p className='text-xs-center'>
            <Link className={styles.link} to={oppositeLink}>
              {crossLinkText}
            </Link>
          </p>

          <ListErrors errors={apiErrors} />

          <form
            className={styles.form} name={formName} noValidate
            onSubmit={handleSubmitForm}
          >
            {children}
            <div className={styles.submit}>
              <Button disabled={!isFormValid} onClick={handleSubmitForm}>
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
  oppositeLink: PropTypes.string,
  crossLinkText: PropTypes.string,
  formName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthForm;
