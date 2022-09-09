import { createContext } from 'react';
import translations from '../constants/translations';

export const TranslationContext = createContext([]);

export const TranslationProvider = ({ children }) => (
  <TranslationContext.Provider value={translations}>{children}</TranslationContext.Provider>
);
