import { createSlice } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/types';
import { IAsyncStart, ILogin, IRegister, ISetApiMessage } from '../../utils/typesActions';

type TAuthState = {
  errors: TtodoAny | null;
  inProgress: boolean;
};

const initialState: TAuthState = {
  errors: null,
  inProgress: false,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: ILogin) {
      state.inProgress = false;
      state.errors = action.error ? action.payload.errors : null;
    },
    loginPageUnload() {},
    register(state, action: IRegister) {
      state.inProgress = false;
      state.errors = action.error ? action.payload.errors : null;
    },
    registerPageUnload() {
      return { ...initialState };
    },
    // Избавиться от UPDATE_FIELD_AUTH
    asyncStart(state, action: IAsyncStart) {
      if (
        action.payload === authReducer.actions.login.type ||
        action.payload === authReducer.actions.register.type
      ) {
        state.inProgress = true;
      }
    },
    asyncEnd() {},
    setApiMessage(state, action: ISetApiMessage) {
      state.errors = action.payload;
    },
    clearApiMessage(state) {
      state.errors = null;
    },
  },
});

export const {
  login,
  loginPageUnload,
  register,
  registerPageUnload,
  asyncStart,
  asyncEnd,
  setApiMessage,
  clearApiMessage,
} = authReducer.actions;

export default authReducer.reducer;
