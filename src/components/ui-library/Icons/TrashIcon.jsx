import PropTypes from 'prop-types';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const TrashIcon = ({ onClick, size = 'default', color = 'primary', className = '' }) => {
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
        d='M3 6H5H21'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M10 11V17'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M14 11V17'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </IconWrapper>
  );
};

TrashIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default TrashIcon;
