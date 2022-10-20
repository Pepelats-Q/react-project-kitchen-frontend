import { createSlice } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/types';

type TAuthState = {
  errors: TtodoAny | null;
  inProgress: boolean;
};

const initialState: TAuthState = {
  errors: null,
  inProgress: false,
};

interface ILogin {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    errors?: any;
    payload: any;
  };
}

interface IRegister {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    errors?: any;
    payload: any;
  };
}

interface IAsyncStart {
  readonly type: string;
  readonly payload: string;
}

interface ISetApiMessage {
  readonly type: string;
  readonly payload: any;
}

export type TAuthActions = ILogin | IRegister | IAsyncStart | ISetApiMessage;

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
