import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

type TPropsButton = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: any;
  isSubmit?: boolean;
  onClick?: (ev: React.SyntheticEvent) => void;
  type?: string;
  value?: string;
};

const Button: FC<TPropsButton> = ({
  icon,
  onClick,
  type = 'primary',
  isSubmit = false,
  disabled = false,
  className = '',
  children = 'Кнопка',
  value = 'ru',
}) => {
  const types: {[key: string]: string} = {
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

export default Button;
