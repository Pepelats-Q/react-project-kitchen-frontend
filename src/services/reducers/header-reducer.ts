import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type THeaderState = {
  isMobileMenuOpen: boolean;
};

const initialState: THeaderState = {
  isMobileMenuOpen: false,
};

// TODO: Кажется нужно этот редьюсер вообще удалить
const headerReducer = createSlice({
  name: 'header',
  initialState,
  reducers: {
    // TODO: У нас вообще нет мобильной версии же
    toggleMobileMenu(state, action: PayloadAction<boolean>) {
      state.isMobileMenuOpen = action.payload;
    },
  },
});

export const { toggleMobileMenu } = headerReducer.actions;

export default headerReducer.reducer;
