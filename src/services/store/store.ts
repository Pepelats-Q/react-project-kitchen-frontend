import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import history from '../../history';
import { localStorageMiddleware, promiseMiddleware } from '../../middleware';
import rootReducer from '../reducers';

// TODO: от connected-react-router может лучше избавиться?
const myRouterMiddleware = routerMiddleware(history);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([myRouterMiddleware, promiseMiddleware, localStorageMiddleware]),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
