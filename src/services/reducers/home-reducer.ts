import { createSlice } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/typesTs';

type THomeState = {
  tags: Array<string>;
};
// TODO: Что это за набор тегов?
const initialState: THomeState = {
  tags: ['app', 'web', 'frontend', 'react'],
};

// TODO: Кажется нужно этот редьюсер вообще удалить
const homeReducer = createSlice({
  name: 'home',
  initialState,
  reducers: {
    homePageLoad(state, action: TtodoAny) {
      state.tags = [...action.payload.payload[0].tags];
    },
    homePageUnload() {
      return { ...initialState };
    },
  },
});

export const { homePageLoad, homePageUnload } = homeReducer.actions;

export default homeReducer.reducer;
