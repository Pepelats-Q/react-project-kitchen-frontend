import { createSlice } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/typesTs';
import { asyncEnd, asyncStart } from './auth-reducer';

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
    settingsSaved(state, action: TtodoAny) {
      state.errors = action.error ? action.payload.errors : null;
      state.inProgress = false;
    },
    settingsPageUnload() {
      return { ...initialState };
    },
  },
  extraReducers: {
    // TODO: asyncStart стоит в одном месте держать, на мой взгляд
    [asyncStart.type]: (state) => {
      state.inProgress = true;
    },
    [asyncEnd.type]: (state) => {
      state.inProgress = false;
    },
  },
});

export const { settingsSaved } = settingsReducer.actions;

export default settingsReducer.reducer;
