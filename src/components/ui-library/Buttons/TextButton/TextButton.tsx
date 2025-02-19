import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './TextButton.module.scss';

type TPropsTextButton = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  value?: string;
  onClick?: (ev: React.SyntheticEvent) => void;
};

const TextButton: FC<TPropsTextButton> = ({
  onClick,
  children = 'Кнопка',
  className = '',
  color = 'accent',
  value = '',
}) => (
  <button
    className={clsx(styles.text_button, styles[color], className)}
    onClick={onClick}
    type='button'
    value={value}
  >
    {children}
  </button>
);

export default TextButton;
