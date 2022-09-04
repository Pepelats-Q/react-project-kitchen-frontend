import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/typesTs';
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
};

const initialState: TCommonState = {
  appName: 'Pepelats-Q',
  appLoaded: false,
  currentUser: null,
  redirectTo: null,
  token: null,
  viewChangeCounter: 0,
};

const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    appLoad(state, action: TtodoAny) {
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
    // TODO: Этот экшен нигде не используется
    redirect(state) {
      state.redirectTo = null; 
    },
    // TODO: Почему редиректы вообще тут?
    articleDelete(state) {
      state.redirectTo = '/';
    },
  },
  extraReducers: {
    [articleSubmit.type]: (state, action: PayloadAction<TtodoAny>) => {
      state.redirectTo = `/article/${action.payload.payload.article.slug}`;
    },
    [settingsSaved.type]: (state, action: AnyAction) => {
      state.redirectTo = action.error ? null : '/';
      state.currentUser = action.error ? null : action.payload.payload.user;
    },
    [register.type]: (state, action: AnyAction) => {
      state.redirectTo = action.error ? null : '/';
      state.token = action.error ? null : action.payload.payload.user.token;
      state.currentUser = action.error ? null : action.payload.payload.user;
    },
    [login.type]: (state, action: AnyAction) => {
      state.redirectTo = action.error ? null : '/';
      state.token = action.error ? null : action.payload.payload.user.token;
      state.currentUser = action.error ? null : action.payload.payload.user;
    },
    [registerPageUnload.type]: (state) => {
      state.viewChangeCounter += state.viewChangeCounter;
    },
  },
});

export const { appLoad, logout, redirect, articleDelete } = commonReducer.actions;

export default commonReducer.reducer;
