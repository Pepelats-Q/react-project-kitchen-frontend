import { FC } from 'react';
import { TPropsUIIcon } from '../../../utils/typesUI';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const ProfileIconBlank: FC<TPropsUIIcon> = ({
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
      <circle cx='12' cy='12' fill='#4C4CFF' r='12' />
      <path
        d='M4.80005 10.101C4.80005 14.4227 8.6233 20.4 12.0001 20.4C15.179 20.4 19.2 14.4227 19.2 10.101C19.2 5.77925 15.9765 3.59998 12 3.59998C8.02356 3.59998 4.80005 5.77925 4.80005 10.101ZM13.8708 13.2967C14.7499 12.4876 15.9764 12.1933 17.1084 12.4135C17.3477 13.4554 17.028 14.5842 16.1488 15.3934C15.2697 16.2025 14.0432 16.4967 12.9112 16.2765C12.6719 15.2346 12.9916 14.1058 13.8708 13.2967ZM6.89163 12.4135C8.02365 12.1933 9.25019 12.4875 10.1293 13.2967C11.0084 14.1058 11.3282 15.2346 11.0889 16.2765C9.95689 16.4967 8.73035 16.2024 7.85123 15.3933C6.9721 14.5842 6.6524 13.4553 6.89163 12.4135Z'
        fill='#1C1C21'
      />
    </IconWrapper>
  );
};

export default ProfileIconBlank;
