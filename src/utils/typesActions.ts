import { TUserWithToken } from './types';
import { TArticle, TComment, TUser } from './typesComponentProps';

// article reducer actions
export interface IArticlePageLoad {
  readonly type: string;
  readonly payload: {
    payload: [{ article: TArticle }, { comments: Array<TComment> }];
  };
}

export interface IAddComment {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    errors?: any;
    payload: {
      comment: TComment;
    };
  };
}

export interface IDeleteComment {
  readonly type: string;
  readonly payload: {
    commentId: string;
    payload: any;
  };
}
type TArticleActions = IArticlePageLoad | IAddComment | IDeleteComment;

// article list reducer actions
export interface IArticleFavorite {
  readonly type: string;
  readonly payload: {
    payload: {
      article: TArticle;
    };
  };
}

export interface ILoadAllArticles {
  readonly type: string;
  readonly payload: {
    payload: {
      articles: Array<TArticle>;
    };
  };
}

export interface ISetPageAction {
  readonly type: string;
  readonly page?: any;
  readonly payload: {
    readonly page?: any;
    payload: {
      articles: Array<TArticle>;
      articlesCount: number;
    };
  };
}

export interface ILoadAllTags {
  readonly type: string;
  readonly payload: {
    payload: {
      tags: Array<string>;
    };
  };
}

export interface IApplyTagFilter {
  readonly type: string;
  readonly tag?: string;
  readonly pager?: any;
  readonly payload: {
    tag?: string;
    pager?: any;
    payload: {
      articles: Array<TArticle>;
      articlesCount: number;
    };
  };
}

export interface IChangeTab {
  readonly type: string;
  readonly tab?: string;
  readonly pager?: any;
  readonly payload: {
    tab: string;
    pager?: any;
    payload: {
      articles: Array<TArticle>;
      articlesCount: number;
    };
  };
}

export type TArticleListActions =
  | IArticleFavorite
  | ILoadAllArticles
  | ISetPageAction
  | ILoadAllTags
  | IApplyTagFilter
  | IChangeTab;

// auth reducer actions:
export interface ILogin {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    errors?: any;
    payload: any;
  };
}

export interface IRegister {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    errors?: any;
    payload: any;
  };
}

export interface IAsyncStart {
  readonly type: string;
  readonly payload: string;
}

export interface ISetApiMessage {
  readonly type: string;
  readonly payload: any;
}

type TAuthActions = ILogin | IRegister | IAsyncStart | ISetApiMessage;

// common reducer actions:
export interface ICommonAppLoad {
  readonly type: string;
  readonly payload: {
    payload: {
      user: TUserWithToken | null;
    };
  };
}

export interface IArticleDelete {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    payload: {
      article: TArticle;
    };
  };
}

export interface IChangeLang {
  readonly type: string;
  readonly payload: string;
}

export interface IArticleSubmitType {
  readonly type: string;
  readonly payload: {
    payload: {
      article: TArticle;
    };
  };
}

export interface ISettingsSavedType {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    payload: {
      user?: TUserWithToken;
    };
  };
}

export interface IRegisterType {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    payload: {
      user: TUserWithToken;
    };
  };
}

export interface ILoginType {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    payload: {
      user: TUserWithToken;
    };
  };
}

type TCommonActions =
  | ICommonAppLoad
  | IChangeLang
  | IArticleDelete
  | IArticleSubmitType
  | ISettingsSavedType
  | IRegisterType
  | ILoginType;

// editor reducer actions:

export interface IEditorArticleSubmit {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    errors?: any;
    payload?: any;
  };
}

export interface IEditorAsyncStart {
  readonly type: string;
  readonly subtype?: any;
}

type TEditorActions = IEditorArticleSubmit | IEditorAsyncStart;

// profile reducer actions:
export interface IFollowUser {
  readonly type: string;
  readonly payload: {
    payload: {
      profile: TUser;
    };
  };
}
export interface IUnFollowUser {
  readonly type: string;
  readonly payload: {
    payload: {
      profile: TUser;
    };
  };
}

export interface IGetProfile {
  readonly type: string;
  readonly payload: {
    payload: {
      profile: TUser;
    };
  };
}

type TProfileActions = IFollowUser | IUnFollowUser | IGetProfile;

export interface ISettingsSaved {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    errors?: any;
    payload: {
      user?: TUserWithToken;
    };
  };
}

type TSettingsActions = ISettingsSaved;

export type TAppActions =
  | TArticleActions
  | TArticleListActions
  | TAuthActions
  | TCommonActions
  | TEditorActions
  | TProfileActions
  | TSettingsActions;

export type TArticleAction = {};
