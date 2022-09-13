import { FC } from 'react';
import styles from './listErrors.module.scss';

const { messages } = styles;

type TErrorsList = {
  errors: any;
};

const ListErrors: FC<TErrorsList> = ({ errors }) => {
  if (errors) {
    const errorsKeys = Object.keys(errors);
    const errorsValues = Object.values(errors);
    return (
      <ul className={messages}>
        {errorsKeys.map((objKey, index) => (
          <li key={objKey}>
            {`${objKey} ${errorsValues[index]}`}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

export default ListErrors;
