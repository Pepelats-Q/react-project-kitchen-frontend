import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useState } from 'react';
import styles from './TextArea.module.scss';

const TextArea = ({
  message,
  name,
  onChange,
  ref,
  value,
  className = '',
  label = 'Название поля',
  maxLength = 512,
  minLength = 0,
  placeholder = '',
  required = false,
  rows = 5,
  textareaState = 'default',
  type = 'text',
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        ref={ref}
        className={clsx(
          styles.textarea,
          isFocus ? styles.textarea_focus : '',
          textareaState === 'success' ? styles.textarea_success : '',
          textareaState === 'error' ? styles.textarea_error : '',
        )}
        id={name}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        type={type}
        value={value}
      />
      {message && (
        <p
          className={clsx(
            styles.text,
            textareaState === 'success' ? styles.text_success : '',
            textareaState === 'error' ? styles.text_error : '',
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  message: PropTypes.string,
  minLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  required: PropTypes.bool,
  rows: PropTypes.number,
  textareaState: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextArea;
