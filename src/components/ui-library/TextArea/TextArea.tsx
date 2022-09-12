import clsx from 'clsx';

import { FC, useState } from 'react';
import { TPropsUITextArea } from '../../../utils/typesUI';
import styles from './TextArea.module.scss';

const TextArea:FC<TPropsUITextArea> = ({
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



export default TextArea;
