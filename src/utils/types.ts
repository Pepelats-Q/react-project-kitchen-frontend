export type TtodoAny = any;

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

export type TUserWithToken = {
  username: string;
  bio?: string;
  image?: string;
  following?: boolean;
  token: string;
};
