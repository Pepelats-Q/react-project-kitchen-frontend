import React, { createContext } from 'react';
import translations from '../constants/translations';

export const TranslationContext = createContext<{
  [key: string]: { [key: string]: { [key: string]: string } };
}>({});

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => (
  <TranslationContext.Provider value={translations}>{children}</TranslationContext.Provider>
);
