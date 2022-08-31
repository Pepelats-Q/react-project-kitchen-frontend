import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/typesTs';

type TSettingsState = {
  errors: TtodoAny | null;
  inProgress: boolean;
};

const initialState: TSettingsState = {
  errors: null,
  inProgress: false,
};

const settingsReducer = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsSaved(state, action: AnyAction) {
      state.errors = action.error ? action.payload.errors : null;
      state.inProgress = false;
    },
  },
  // extraReducers: {
  //   [asyncStart]: (state) => {
  //     state.inProgress = true;
  //   },
  //   [asyncEnd]: (state) => {
  //     state.inProgress = false;
  //   },
  // },
});

export const {settingsSaved} = settingsReducer.actions;

export default settingsReducer.reducer;
