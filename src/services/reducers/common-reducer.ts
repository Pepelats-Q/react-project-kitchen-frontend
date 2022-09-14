import { createSlice } from '@reduxjs/toolkit';
import { TArticle, TtodoAny, TUserWithToken } from '../../utils/types';
import { login, register, registerPageUnload } from './auth-reducer';
import { articleSubmit } from './editor-reducer';
import { settingsSaved } from './settings-reducer';

type TCurrentUser = TtodoAny;

type TCommonState = {
  appName: string;
  appLoaded: boolean;
  currentUser: TCurrentUser | null;
  redirectTo: string | null;
  token: string | null;
  viewChangeCounter: number;
  currentLang: string;
};

const initialState: TCommonState = {
  appName: 'Pepelats-Q',
  appLoaded: false,
  currentUser: null,
  redirectTo: null,
  token: null,
  viewChangeCounter: 0,
  currentLang: 'ru',
};

interface ICommonAppLoad {
  readonly type: string;
  readonly payload: {
    payload: {
      user: TUserWithToken | null;
    };
  };
}

interface IArticleDelete {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    payload: {
      article: TArticle;
    };
  };
}

interface IChangeLang {
  readonly type: string;
  readonly payload: string;
}

interface IArticleSubmitType {
  readonly type: string;
  readonly payload: {
    payload: {
      article: TArticle;
    };
  };
}

interface ISettingsSavedType {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    payload: {
      user?: TUserWithToken;
    };
  };
}

interface IRegisterType {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    payload: {
      user: TUserWithToken;
    };
  };
}

interface ILoginType {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    payload: {
      user: TUserWithToken;
    };
  };
}

export type TCommonActions =
  | ICommonAppLoad
  | IChangeLang
  | IArticleDelete
  | IArticleSubmitType
  | ISettingsSavedType
  | IRegisterType
  | ILoginType;

const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    appLoad(state, action: ICommonAppLoad) {
      const token = window.localStorage.getItem('jwt');
      state.token = token || null;
      state.appLoaded = true;
      state.currentUser = action.payload?.payload ? action.payload.payload.user : null;
    },
    logout(state) {
      state.redirectTo = '/';
      state.token = null;
      state.currentUser = null;
    },
    redirect(state) {
      state.redirectTo = null;
    },
    // TODO: Почему редиректы вообще тут?
    articleDelete(state, action: IArticleDelete) {
      state.redirectTo = action.error ? null : '/';
    },
    changeLanguage(state, action: IChangeLang) {
      state.currentLang = action.payload;
    },
  },
  extraReducers: {
    [articleSubmit.type]: (state, action: IArticleSubmitType) => {
      state.redirectTo = `/article/${action.payload.payload.article.slug}`;
    },
    [settingsSaved.type]: (state, action: ISettingsSavedType) => {
      state.redirectTo = action.error ? null : '/';
      state.currentUser = action.error ? null : action.payload.payload.user;
    },
    [register.type]: (state, action: IRegisterType) => {
      state.redirectTo = action.error ? null : '/';
      state.token = action.error ? null : action.payload.payload.user.token;
      state.currentUser = action.error ? null : action.payload.payload.user;
    },
    [login.type]: (state, action: ILoginType) => {
      state.redirectTo = action.error ? null : '/';
      state.token = action.error ? null : action.payload.payload.user.token;
      state.currentUser = action.error ? null : action.payload.payload.user;
    },
    [registerPageUnload.type]: (state) => {
      state.viewChangeCounter += state.viewChangeCounter;
    },
  },
});

export const { appLoad, logout, redirect, articleDelete, changeLanguage } = commonReducer.actions;

export default commonReducer.reducer;
