import PropTypes from 'prop-types';
import styles from './listErrors.module.scss';

const { messages } = styles;
const ListErrors = ({ errors }) => {
  if (errors) {
    const errorsKeys = Object.keys(errors);
    const errorsValues = Object.values(errors);
    return (
      <ul className={messages}>
        {errorsKeys.map((objKey, index) => (
          <li key={objKey}>
            {objKey} {errorsValues[index]}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

ListErrors.propTypes = {
  errors: PropTypes.object,
};

export default ListErrors;
