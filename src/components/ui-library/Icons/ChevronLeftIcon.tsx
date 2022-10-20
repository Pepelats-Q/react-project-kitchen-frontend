import { FC } from 'react';
import { TPropsUIIcon } from '../../../utils/typesUI';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const ChevronLeftIcon: FC<TPropsUIIcon> = ({
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
        d='M11 17L6 12L11 7'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M18 17L13 12L18 7'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </IconWrapper>
  );
};

export default ChevronLeftIcon;
