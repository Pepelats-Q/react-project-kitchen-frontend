import { createSlice, AnyAction } from '@reduxjs/toolkit';

type THomeState = {
  tags: Array<string>;
};

const initialState: THomeState = {
  tags: ['app', 'web', 'frontend', 'react'],
};

// TODO: Кажется нужно этот редьюсер вообще удалить
const homeReducer = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // TODO: Этот экшен надо проверить, так он ещё в articleList есть.
    homePageLoad(state, action: AnyAction) {
      state.tags = [...action.payload[0].tags];
    },
    homePageUnload() {
      return { ...initialState };
    },
  },
});

export const { homePageUnload } = homeReducer.actions;

export default homeReducer.reducer;
