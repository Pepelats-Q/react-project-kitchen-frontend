import PropTypes from 'prop-types';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const MinusIcon = ({ onClick, size = 'default', color = 'primary', className = '' }) => {
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
        d='M5 12H19'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </IconWrapper>
  );
};

MinusIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default MinusIcon;
