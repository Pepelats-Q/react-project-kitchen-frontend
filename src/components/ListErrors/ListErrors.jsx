import PropTypes from 'prop-types';
import styles from './listErrors.module.scss';

const { messages } = styles;

const ListErrors = ({ errors }) => {
  if (errors) {
    return (
      <ul className={messages}>
        {Object.keys(errors).map((key) => (
          <li key={key}>
            {key} {errors[key]}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

ListErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ListErrors;
