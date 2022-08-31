import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/typesTs';

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
    login() {},
    loginPageUnload() {},
    register(state, action: AnyAction) {
      state.inProgress = false;
      state.errors = action.error ? action.payload.errors : null;
    },
    registerPageUnload() {},
  },
});

export const { login, loginPageUnload, register, registerPageUnload } = authReducer.actions;

export default authReducer.reducer;
