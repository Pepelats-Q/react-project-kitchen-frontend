import { TPropsHookIcon } from '../../../../utils/typesUI';

const useIconParams = ({
  onClick,
  size = 'default',
  color,
  className,
  filled = false,
}: TPropsHookIcon) => {
  const sizes = { default: '24', small: '20' };

  return {
    size: sizes[size],
    color: filled ? `${color}_fill` : `${color}_stroke`,
    className: className || '',
    onClick,
  };
};

export default useIconParams;
