export type TtodoAny = any;

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

export type TUser = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
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

export type TPropsWithSlug = { slug: string };

export type TNavHeader = { unFoldMobileMenu: () => void };

export type TUsernameParams = {
  username: string;
};

export type TUserWithToken = {
  username: string;
  bio?: string;
  image?: string;
  following?: boolean;
  token: string;
};
