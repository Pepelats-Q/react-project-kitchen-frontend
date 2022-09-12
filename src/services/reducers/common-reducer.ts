import { createSlice } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/types';
import {
  IArticleDelete,
  IArticleSubmitType,
  IChangeLang,
  ICommonAppLoad,
  ILoginType,
  IRegisterType,
  ISettingsSavedType,
} from '../../utils/typesActions';
import { login, register, registerPageUnload } from './auth-reducer';
import { articleSubmit } from './editor-reducer';
import { settingsSaved } from './settings-reducer';

type TUser = TtodoAny;

type TCommonState = {
  appName: string;
  appLoaded: boolean;
  currentUser: TUser | null;
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
