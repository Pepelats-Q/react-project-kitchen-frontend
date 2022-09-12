import React from 'react';
import { TNames, TValidity } from './types';

export type TArticleList = {
  articles: Array<TArticle>;
  articlesCount: number;
  pager?: () => void;
  currentPage?: number;
};

export type TArticlePreviewProps = {
  article: TArticle;
};

export type TCommentCardProps = {
  comment: {
    author: {
      username: string;
      image: string;
      following: boolean;
    };
    id: string;
    body: string;
    createdAt: string;
  };
  slug: string;
};

export type TErrorsList = {
  errors: any;
};

export type TListPaginationProps = {
  articlesCount: number;
  pager: any;
  currentPage: any;
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

export type TNavHeader = { unFoldMobileMenu: () => void };

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
