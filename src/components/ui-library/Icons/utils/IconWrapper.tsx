import { FC } from 'react';

import clsx from 'clsx';

import styles from './IconWrapper.module.scss';
import { TPropsUIIconWrapper } from '../../../../utils/typesUI';

const IconWrapper: FC<TPropsUIIconWrapper> = ({ children, color, handleClick, size, className }) =>
  handleClick ? (
    <button
      className={clsx(
        styles.button,
        color ? styles[color] : 'not_supported_color',
        styles.onclick,
        className,
      )}
      onClick={handleClick}
      type='button'
    >
      <svg
        fill='none'
        height={size}
        style={{ minWidth: size }}
        viewBox='0 0 24 24'
        width={size}
        xmlns='http://www.w3.org/2000/svg'
      >
        {children}
      </svg>
    </button>
  ) : (
    <svg
      className={clsx(color ? styles[color] : 'not_supported_color', className)}
      fill='none'
      height={size}
      style={{ minWidth: size }}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      {children}
    </svg>
  );

export default IconWrapper;
