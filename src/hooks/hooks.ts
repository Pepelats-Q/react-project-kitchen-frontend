import { ThunkDispatch } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import store from '../services/store/store';
import { TAppActions } from '../utils/typesActions';

type RootState = ReturnType<typeof store.getState>;

const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
const useDispatch = () => dispatchHook<AppDispatch>();

export { useSelector, useDispatch };
