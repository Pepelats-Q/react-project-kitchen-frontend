import clsx from 'clsx';

import { FC, useState } from 'react';
import styles from './TextArea.module.scss';

type TUITextAreaProps = {
  className?: string;
  label?: string;
  maxLength?: number;
  message?: string;
  minLength?: number;
  name: string;
  onChange?: (e: any) => void;
  placeholder: string;
  ref?: () => void | { current: HTMLInputElement };
  required?: boolean;
  rows?: number;
  textareaState?: string;
  value?: string;
};

const TextArea: FC<TUITextAreaProps> = ({
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
