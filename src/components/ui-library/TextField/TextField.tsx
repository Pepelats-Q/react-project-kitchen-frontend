import React, { FC, useState } from 'react';
import clsx from 'clsx';
import styles from './TextField.module.scss';

type TUITextFieldProps = {
  autocomplete?: string;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  maxLength?: number;
  message?: string;
  minLength?: number;
  name: string;
  onChange: (e: any) => void;
  onKeyUp?: (e: any) => void;
  onBlur?: (e: any) => void;
  placeholder?: string;
  ref?: () => void | { current: HTMLInputElement };
  required?: boolean;
  fieldValid?: boolean;
  type?: string;
  value?: string;
};

const TextField: FC<TUITextFieldProps> = ({
  icon,
  message,
  name,
  onChange,
  onKeyUp,
  onBlur,
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
  // COMMENT TO DEL: состояние textfieldState  предлагаю не использовать совсем. Мы используем fieldValid из хука useFormValidation
  // это поле показывает булевое значение - валидно ли поле или нет, нежели использовать стринговое 'success'

  const [isFocus, setIsFocus] = useState(false);

  const onBlurInput = (e: any) => {
    if (onBlur) {
      onBlur(e);
    }

    setIsFocus(false);
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      <label className={styles.label} htmlFor={name}>
        {label}
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
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onBlurInput}
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
