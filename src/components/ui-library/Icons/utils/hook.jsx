const useIconParams = ({ onClick, size, color, className, filled = false }) => {
  const sizes = { default: '24', small: '20' };

  return {
    size: sizes[size] ? sizes[size] : sizes.default,
    color: filled ? `${color}_fill` : `${color}_stroke`,
    className: className || '',
    onClick,
  };
};

export default useIconParams;
