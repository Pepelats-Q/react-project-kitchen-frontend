export type TPropsHookIcon = {
  onClick?: () => void;
  size?: 'default' | 'small';
  color: string;
  className: string;
  filled?: boolean;
};

export type TPropsUIIcon = {
  className?: string;
  color?: string;
  onClick?: () => void;
  size?: 'default' | 'small';
};
