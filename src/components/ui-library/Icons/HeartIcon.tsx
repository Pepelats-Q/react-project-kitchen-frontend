import { FC } from 'react';
import { TPropsUIIcon } from '../../../utils/typesUI';
import useIconParams from './utils/hook';
import IconWrapper from './utils/IconWrapper';

const HeartIcon :FC<TPropsUIIcon> = ({ onClick, size = 'default', color = 'primary', className = '' }) => {
  const icon = useIconParams({
    size,
    color,
    className,
    onClick,
  });

  return (
    <IconWrapper
      className={icon.className}
      color={icon.color}
      handleClick={icon.onClick}
      size={icon.size}
    >
      <path
        d='M20.1327 5.31877L20.1331 5.3191C20.5511 5.73699 20.8828 6.23316 21.1091 6.77926C21.3354 7.32537 21.4518 7.9107 21.4518 8.50183C21.4518 9.09295 21.3354 9.67828 21.1091 10.2244C20.8828 10.7705 20.5511 11.2667 20.1331 11.6846L20.1329 11.6847L19.0729 12.7447L12 19.8176L4.9271 12.7447L3.8671 11.6847C3.02295 10.8406 2.54871 9.69564 2.54871 8.50183C2.54871 7.30801 3.02295 6.16309 3.8671 5.31893C4.71126 4.47478 5.85618 4.00053 7.05 4.00053C8.24381 4.00053 9.38873 4.47478 10.2329 5.31893L11.2929 6.37893L12 7.08604L12.7071 6.37893L13.7671 5.31893L13.7673 5.31877C14.1852 4.90068 14.6813 4.56902 15.2274 4.34274C15.7735 4.11647 16.3589 4 16.95 4C17.5411 4 18.1265 4.11647 18.6726 4.34274C19.2187 4.56902 19.7148 4.90068 20.1327 5.31877Z'
        stroke={icon.color}
        strokeLinecap='round'
        strokeWidth='2'
      />
    </IconWrapper>
  );
};

export default HeartIcon;