import clsx from 'clsx';

import { FC, useState } from 'react';
import { TPropsUITextField } from '../../../utils/typesUI';
import styles from './TextField.module.scss';

const TextField: FC<TPropsUITextField> = ({
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
  fieldValid = true,
  type = 'text',
  value = '',
  autocomplete = 'off',
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <label className={styles.label} htmlFor={name}>
        {label}
        <sup>{`${required ? '*' : ''}`}</sup>
      </label>

      <div
        className={clsx(
          styles.textfield,
          isFocus ? styles.textfield_focus : '',
          fieldValid ? '' : styles.textfield_error,
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
        <p className={clsx(styles.text, fieldValid ? '' : styles.text_error)}>{message}</p>
      )}
    </div>
  );
};

export default TextField;
