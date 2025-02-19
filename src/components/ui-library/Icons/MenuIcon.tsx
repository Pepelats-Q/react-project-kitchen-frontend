import { FC } from 'react';
import { TPropsUIIcon } from '../../../utils/typesUI';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const MenuIcon: FC<TPropsUIIcon> = ({
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
        d='M4 6H20M4 12H20M4 18H20'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M6 6H20M4 12H20M4 18H20'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M4 6H20M4 12H20M4 18H20'
        stroke='red'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </IconWrapper>
  );
};

export default MenuIcon;
