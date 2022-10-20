import { FC } from 'react';
import { TPropsUIIcon } from '../../../utils/typesUI';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const PlusIcon: FC<TPropsUIIcon> = ({
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
        d='M12 5V19'
        stroke={icon.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
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

export default PlusIcon;
