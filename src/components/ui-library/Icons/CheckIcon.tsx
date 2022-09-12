import { FC } from 'react';
import { TPropsUIIcon } from '../../../utils/typesTs';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const CheckIcon: FC<TPropsUIIcon> = ({
  onClick,
  size = 'default',
  color = 'primary',
  className = '',
}) => {
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
        d='M20 6L9 17L4 12'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </IconWrapper>
  );
};

export default CheckIcon;
