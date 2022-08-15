import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './IconWrapper.module.scss';

const IconWrapper = ({ children, color, handleClick, size, className }) =>
  handleClick ? (
    <button
      className={clsx(
        styles.button,
        styles[color] ? styles[color] : 'not_supported_color',
        handleClick ? styles.onclick : '',
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
      className={clsx(styles[color] ? styles[color] : 'not_supported_color', className)}
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

IconWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  handleClick: PropTypes.func,
  size: PropTypes.string,
};

export default IconWrapper;
