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
};

export type TComment = {
  id: string;
  body: string;
  createdAt: string;
};

export type TValidity = {
  email?: string;
  name?: string;
  password?: string;
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
  crossLinkText: string;
  formName: string;
  isFormValid: boolean;
  onSubmit: () => void;
  oppositeLink: string;
};

export type TPropsWithSlug = { slug: string };

export type TUserWIthDate = {
  author: any;
  date: string;
};
