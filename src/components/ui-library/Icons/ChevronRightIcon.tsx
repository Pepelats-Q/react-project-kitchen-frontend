import PropTypes from 'prop-types';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const ChevronRightIcon = ({ onClick, size = 'default', color = 'primary', className = '' }) => {
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
        d='M13 17L18 12L13 7'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M6 17L11 12L6 7'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </IconWrapper>
  );
};

ChevronRightIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default ChevronRightIcon;
