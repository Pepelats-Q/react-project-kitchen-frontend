import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/typesTs';
import { register } from './auth-reducer';
import { articleSubmit } from './editor-reducer';
import { settingsSaved } from './settings-reducer';

type TUser = TtodoAny;

type TCommonState = {
  appName: string;
  appLoaded: boolean;
  currentUser: TUser | null;
  redirectTo: string | null;
  token: null;
  viewChangeCounter: 0;
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
      state.token = action.token || null;
      state.appLoaded = true;
      state.currentUser = action.payload ? action.payload.user : null;
    },
    logout(state) {
      state.redirectTo = '/';
      state.token = null;
      state.currentUser = null;
    },
    redirect(state) {
      state.redirectTo = null;
    },
  },
  extraReducers: {
    [articleSubmit.type]: (state, action: PayloadAction<TtodoAny>) => {
      state.redirectTo = `/article/${action.payload.article.slug}`;
    },
    [settingsSaved.type]: (state, action: AnyAction) => {
      state.redirectTo = action.error ? null : '/';
      state.currentUser = action.error ? null : action.payload.user;
    },
    [register.type]: (state, action: AnyAction) => {
      state.redirectTo = action.error ? null : '/';
      state.token = action.error ? null : action.payload.user.token;
      state.currentUser = action.error ? null : action.payload.user;
    },
  },
});

export const { appLoad, logout, redirect } = commonReducer.actions;

export default commonReducer.reducer;
