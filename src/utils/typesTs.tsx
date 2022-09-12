import React from 'react';

export type TtodoAny = any;

export type TUser = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type TArticle = {
  author: TUser;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Array<string>;
  title: string;
  updatedAt: string;
  link?: string;
};

export type TComment = {
  id: string;
  body: string;
  createdAt: string;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
};

export type TValidity = {
  email?: string;
  name?: string;
  password?: string;
  title?: string;
  description?: string;
  link?: string;
  body?: string;
  tag?: string;

  image?: string;
  username?: string;
  bio?: string;
};

export type TValidityBoolean = {
  email?: boolean;
  name?: boolean;
  password?: boolean;
  title?: boolean;
  description?: boolean;
  link?: boolean;
  body?: boolean;
  tag?: boolean;

  image?: boolean;
  username?: boolean;
  bio?: boolean;
};

export type TNames = {
  name: string;
  path: string;
};

export type TUsernameParams = {
  username: string;
};

export type TTabsProps = {
  tabsNames: Array<TNames>;
};

export type TArticlesWithTabsProps = {
  tabsNames: Array<TNames>;
  articles: Array<TArticle>;
  articlesCount: number;
};

export type TBannerProps = {
  appName: string;
};

export type TTabButtonProps = {
  to: string;
  exact?: boolean;
  className?: string;
  text: string;
};

export type TAuthForm = {
  btnText: string;
  children: React.ReactNode;
  crossLinkText?: string;
  formName: string;
  isFormValid: boolean;
  title: string;
  onSubmit: () => void;
  oppositeLink?: string;
  apiErrors: TValidity;
};

export type TPropsWithSlug = { slug: string };

export type TUserWIthDate = {
  author: any;
  date: string;
};

export type TAppActions = any;

export type TArticleAction = {};

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

export type TPropsTextButton = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  value: string;
  onClick?: (ev: React.SyntheticEvent) => void;
};

export type TPropsUIIcon = {
  className: string;
  color: string;
  onClick?: (ev: React.SyntheticEvent) => void;
  size: string;
};
