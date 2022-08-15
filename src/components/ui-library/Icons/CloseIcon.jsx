import PropTypes from 'prop-types';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const CloseIcon = ({ onClick, size = 'default', color = 'primary', className = '' }) => {
  const icon = useIconParams({
    onClick,
    size,
    color,
    className,
  });

  return (
    <IconWrapper
      className={icon.className}
      color={icon.color}
      handleClick={icon.onClick}
      size={icon.size}
    >
      <path
        d='M18 6L6 18'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M6 6L18 18'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </IconWrapper>
  );
};

CloseIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default CloseIcon;
