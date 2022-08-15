import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useState } from 'react';
import styles from './TextField.module.scss';

const TextField = ({
  icon,
  message,
  name,
  onChange,
  onKeyUp,
  ref,
  className = '',
  label = 'Название поля',
  maxLength = 128,
  minLength = 0,
  placeholder = '',
  required = false,
  textfieldState = 'default',
  type = 'text',
  value = '',
  autocomplete = 'off',
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div
        className={clsx(
          styles.textfield,
          isFocus ? styles.textfield_focus : '',
          textfieldState === 'success' ? styles.textfield_success : '',
          textfieldState === 'error' ? styles.textfield_error : '',
        )}
      >
        <input
          ref={ref}
          autoComplete={autocomplete}
          className={styles.input}
          id={name}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
          onFocus={() => setIsFocus(true)}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
        {icon && icon}
      </div>
      {message && (
        <p
          className={clsx(
            styles.text,
            textfieldState === 'success' ? styles.text_success : '',
            textfieldState === 'error' ? styles.text_error : '',
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};

TextField.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  message: PropTypes.string,
  minLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  required: PropTypes.bool,
  textfieldState: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
