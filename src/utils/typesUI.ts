import React from 'react';

export type TPropsHookIcon = {
  onClick?: () => void;
  size?: 'default' | 'small';
  color: string;
  className: string;
  filled?: boolean;
};

export type TPropsButton = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: any;
  isSubmit?: boolean;
  onClick?: (ev: React.SyntheticEvent) => void;
  type?: string;
  value?: string;
};

export type TPropsNavButton = {
  children?: React.ReactNode;
  className?: string;
  icon?: any;
  to: string;
  exact?: boolean;
  type?: string;
};

export type TTabButtonProps = {
  to: string;
  exact?: boolean;
  className?: string;
  text: string;
};

export type TPropsTextButton = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  value?: string;
  onClick?: (ev: React.SyntheticEvent) => void;
};

export type TPropsUIIcon = {
  className?: string;
  color?: string;
  onClick?: () => void;
  size?: 'default' | 'small';
};

/*
export type TPropsUIIconOnClickVoid = {
  className?: string;
  color?: string;
  onClick?: () => void;
  size?: string;
};

*/

export type TPropsUIIconWrapper = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  handleClick?: () => void;
  size?: string;
};

export type TPropsUITextArea = {
  className?: string;
  label?: string;
  maxLength?: number;
  message?: string;
  minLength?: number;
  name: string;
  onChange?: (e: any) => void;
  placeholder: string;
  ref?: () => void | { current: HTMLInputElement };
  required?: boolean;
  rows?: number;
  textareaState?: string;
  value?: string;
};
export type TPropsUITextField = {
  autocomplete?: string;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  maxLength?: number;
  message?: string;
  minLength?: number;
  name: string;
  onChange: (e: any) => void;
  onKeyUp?: (e: any) => void;
  placeholder?: string;
  ref?: () => void | { current: HTMLInputElement };
  required?: boolean;
  fieldValid?: boolean;
  type?: string;
  value?: string;
};
