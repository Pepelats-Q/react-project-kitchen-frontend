import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './TextButton.module.scss';

const TextButton = ({
  active = false,
  onClick,
  children = 'Кнопка',
  className = '',
  color = 'accent',
  value = '',
  typeBtn = 'primary',
}) => {
  const types = {
    primary: styles.primary,
    languages: styles.languages,
  };

  return (
    <button
      className={clsx(
        styles.text_button,
        styles[color],
        types[typeBtn] ? types[typeBtn] : styles.languages,
        active ? styles.btn_active : '',
        className,
      )}
      onClick={onClick}
      type='button'
      value={value}
    >
      {children}
    </button>
  );
};

TextButton.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  typeBtn: PropTypes.string,
};

export default TextButton;
