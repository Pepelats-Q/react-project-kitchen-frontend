import { FC } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';
import { TPropsButton } from '../../../../utils/typesTs';

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
  const types: any = {
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
