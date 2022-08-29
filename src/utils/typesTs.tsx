import React, { MouseEventHandler } from 'react';

export type TValidity = {
  email?: string;
  name?: string;
  password?: string;
};

export type TNames = {
  name: string;
  flag: string;
};

export type TUsernameParams = {
  username: string;
};

export type TTabsProps = {
  tabsNames: Array<TNames>;
  handleClicks: Array<MouseEventHandler<HTMLButtonElement>>;
  currentTabFlag: string;
};

export type TArticlesWithTabsProps = {
  children: React.ReactNode;
};

export type TBannerProps = {
  appName: string;
};

export type TTabButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isCurrent: boolean;
  name: string;
};
