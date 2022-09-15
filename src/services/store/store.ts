import { configureStore } from '@reduxjs/toolkit';
import { localStorageMiddleware, promiseMiddleware } from '../../middleware';
import rootReducer from '../reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([promiseMiddleware, localStorageMiddleware]),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
