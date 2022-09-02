import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type THeaderState = {
  isMobileMenuOpen: boolean;
  currentLang: string;
};

const initialState: THeaderState = {
  isMobileMenuOpen: false,
  currentLang: 'ru',
};

// TODO: Кажется нужно этот редьюсер вообще удалить
const headerReducer = createSlice({
  name: 'header',
  initialState,
  reducers: {
    // TODO: У нас вообще нет мобильной версии же
    toggleMobileMenuAction(state, action: PayloadAction<boolean>) {
      state.isMobileMenuOpen = action.payload;
    },
    // TODO: Хранить язык лучше не в этом редьюсере, так как это хедер
    changeLanguage(state, action: PayloadAction<string>) {
      state.currentLang = action.payload;
    },
  },
});

export const { toggleMobileMenuAction, changeLanguage } = headerReducer.actions;

export default headerReducer.reducer;
