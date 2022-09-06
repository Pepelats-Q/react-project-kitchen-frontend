import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './TextButton.module.scss';

const TextButton = ({
  onClick,
  children = 'Кнопка',
  className = '',
  color = 'accent',
  value = '',
}) => (
  <button
    className={clsx(styles.text_button, styles[color], className)}
    onClick={onClick}
    type='button'
    value={value}
  >
    {children}
  </button>
);

TextButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default TextButton;
