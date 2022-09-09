import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Button.module.scss';

const Button = ({
  icon,
  onClick,
  type = 'primary',
  isSubmit = false,
  disabled = false,
  className = '',
  children = 'Кнопка',
  value = 'ru',
}) => {
  const types = {
    primary: styles.primary,
    outline_alert: styles.outline_alert,
    lang: styles.lang,
  };

  return (
    <button
      className={clsx(className, styles.button, types[type] ? types[type] : '')}
      disabled={disabled}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
      value={value}
    >
      {icon ? (
        <>
          <icon.type />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  isSubmit: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Button;
